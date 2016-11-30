import React, {PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import {Pie} from 'react-chartjs-2'

const styles = {
  chartPaper: {
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left'

  },
  legendPaper: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
  },
  table: {
    minWidth: 320,
    maxWidth: 600,
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'center',
    paddingBottom: 5,

    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: '#ddd',
  },
  votes: {
    textAlign: 'right',
    padding: '4px 16px',
  },
  text: {
    padding: '4px 16px'
  },
  colorBox: {
    width: '2em',
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const PollChart = ({ options }) => {

  let colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462',
  '#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f']
  colors = shuffle(colors)

  const data = {}
  data.labels = []
  data.datasets = []
  data.datasets.push({ data: [], backgroundColor: []})

  options = options.slice()

  options.sort((a, b) => (b.votes - a.votes))

  options.map((option, index) => {
    data.labels.push(' ' + option.text)
    data.datasets[0].data.push(option.votes)
    data.datasets[0].backgroundColor.push(colors[index])

  })

  return (
    <div>
      <Paper zDepth={0} style={styles.chartPaper}>
        <Pie
          data={data}
          options={{
            responsive: true,
            tooltips: {
              position: 'average',
              backgroundColor: 'rgba(0,0,0,0.6)',
              bodyFontSize: 16,
              bodyFontFamily: 'Roboto, sans-serif',
              cornerRadius: 4,
            },
            elements: {
              arc: {
                borderColor: "#fff",
                borderWidth: 0,
              },
            },
            legend: {
              display: false,
            }
          }}
        />
      </Paper>

      <Paper zDepth={0} style={styles.legendPaper}>
        <table style={styles.table}><tbody>
          <tr>
            <th colSpan={3} style={styles.th}>
              Results
            </th>
          </tr>
          {options.map((option, index) => (
            <tr key={option._id}>
              <td style={{
                ...styles.colorBox,
                backgroundColor: colors[index]
              }}>&nbsp;</td>
              <td style={styles.votes}>
                {option.votes > 0 ? option.votes : '-'}
              </td>
              <td style={styles.text}>{option.text}</td>
            </tr>
          ))}
        </tbody></table>
      </Paper>

    </div>
  )
}

PollChart.propTypes = {
  options: PropTypes.array.isRequired
}

export default PollChart
