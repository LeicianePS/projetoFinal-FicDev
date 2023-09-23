import React, { useEffect, useState } from 'react';
import { Card} from "react-bootstrap";
import ApexCharts from 'react-apexcharts';
import { getEfetivoCR } from '../../services/batalhao-service'; // Importe a função da API correta

const EfetivoCRChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: 'bar',
        color: 'green'
      },
      legend: {
        show: true
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: 'Efetivo por Comando Regional',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEfetivoCR(); // Chame sua função de API para obter os dados
        const data = response.data;

        // Extraia os dados da resposta da API
        const categories = data.map(item => item.comando_regional);
        const efetivoCR = data.map(item => item.somaEfetivo);

        // Atualize o estado do gráfico com os dados
        setChartData(prevState => ({
          ...prevState,
          options: {
            ...prevState.options,
            legend: {
                show: true
              },
            xaxis: {
              categories,
            },
          },
          series: [
            {
              data: efetivoCR,
              color: "#00A86B"
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
      <Card.Header className="d-flex justify-content-start"><Card.Title> Efetivo por Comando Regional</Card.Title></Card.Header>
      <ApexCharts options={chartData.options} series={chartData.series} type="bar" height={350} className="col-12" />
    </div>
  );
};

export default EfetivoCRChart;
