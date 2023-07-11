import moment from 'moment';
import ReactApexChart from 'react-apexcharts'
import {Typography} from "@material-ui/core";
export default function GraphMonitoring({ measures, date, idGraph }) {

  //O array "mesures" vem na forma:
  // [
  //   ...
  //   {
  //     "time": "2022-12-22T20:59:38.125Z",
  //     "volumeInMl": 1
  //   }
  //   ...
  // ]
  //O componente exige que a informação do tempo (categoria) seja informada
  //separado dos dados. Esta função realiza a separação e retorna um objeto
  //com dois vetores. Que conterão as informações desejadas

  //Vale ressaltar que ele adiciona somente se o "measure.time" for
  //correspondente a data especificada em "date", atributo do componente
  const separeInfoFromMeasures = () => {
    let includeDate = false;
    const categories = [];
    const categoriesIncludingDate = [];
    const data = [];

    if (measures) {
      let lastDate = moment(measures[0].time);

      measures.forEach((measure) => {
        const time = moment(measure.time);
        const volume = measure.volumeInMl;

        if (!includeDate && !lastDate.isSame(time, 'day')) {
          includeDate = true;
        } else {
          lastDate = time;
        }

        if (!date || time.isSame(date, 'day')) {
          categories.push(time.format('HH:mm[h]'));
          categoriesIncludingDate.push(time.format('HH:mm[h - ] DD/MM'));
          data.push(volume);
        }
      });
    }

    return {
      categories: includeDate ? categoriesIncludingDate : categories,
      data
    };
  }

  const { data, categories } = separeInfoFromMeasures();

  const options = {
    chart: {
      id: idGraph || 'id-graph'
    },
    colors: ['#1B98E0'],
    xaxis: {
      categories
    }
  };

  const series = [{
    name: 'Volume',
    data
  }];

  return (
    <>
      <div id='other-graph'>
      </div>
      {
        measures === undefined ?
            <Typography align='center' variant='h6'>
              O paciente não possui mensurações
            </Typography> :
            <ReactApexChart
                id={idGraph || 'id-graph'}
                options={options}
                series={series}
                type='area'
                width='100%'
                height={320}
            />
      }
    </>
  )
}
