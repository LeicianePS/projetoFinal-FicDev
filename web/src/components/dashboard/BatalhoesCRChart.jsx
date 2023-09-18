import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { getBatalhoesCR } from '../../services/batalhao-service'; // Importe a função da API correta
import { Card } from 'react-bootstrap';

const BatalhoesCRChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: 'Quantidade de Batalhões',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBatalhoesCR(); // Chame sua função de API para obter os dados
        const data = response.data;

        // Extraia os dados da resposta da API
        const categories = data.map(item => item.comando_regional);
        const batalhoesQuantidade = data.map(item => item.quantidadeBatalhoes);

        // Atualize o estado do gráfico com os dados
        setChartData(prevState => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              categories,
            },
          },
          series: [
            {
              data: batalhoesQuantidade,
            },
          ],
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='px-5 py-2'>
      <Card.Header className="d-flex justify-content-start"><Card.Title> Batalhão por Comando Regional</Card.Title></Card.Header>
      <ApexCharts options={chartData.options} series={chartData.series} type="bar" height={350} width={500} />
    </div>
  );
};

export default BatalhoesCRChart;
