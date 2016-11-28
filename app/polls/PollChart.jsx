import React, {PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import {PieChart, Legend} from 'react-easy-chart'

const styles = {
  legend: {
    textAlign: 'left',
    display: 'inline-block',
    '.legend .icon': {
      width: 16,
      height: 12,
      borderRadius: 2
    }
  },
  chartPaper: {
    // maxWidth: 500,
    margin: '10px -20px',
    padding: 10,
    textAlign: 'center'
  }
}

const PollChart = ({data}) => (
        <Paper zDepth={0} style={styles.chartPaper}>
          <PieChart size={270} data={data} />
          <Legend style={styles.legend} data={data} dataId={'key'} styles={styles.legend} />
        </Paper>
)

PollChart.propTypes = {
  data: PropTypes.array.isRequired
}

export default PollChart
