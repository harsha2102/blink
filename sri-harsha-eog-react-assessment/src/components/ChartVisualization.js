import React, { Component } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import moment from "moment";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

class ChartVisualization extends Component {
  componentDidMount() {
    this.props.onLoad();
    this.interval = setInterval(() => {
      this.props.onLoad();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { classes, data } = this.props;
    const chartData = data.data ? data.data : [];
    return (
      <Card className={classes.card}>
        <CardHeader title="Chart Visualization" />
        <CardContent>
          {chartData.length > 0 && (
            <LineChart
              width={800}
              height={400}
              data={chartData}
              margin={{ top: 32, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="metric" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={[
                  chartData[0].timestamp,
                  chartData[chartData.length - 1].timestamp
                ]}
                tickFormatter={tick => moment(tick).format("HH:mm")}
              />
              <YAxis />
              <Tooltip labelFormatter={v => moment(v).format("Do MMM YYYY, HH:ss")} />
            </LineChart>
          )}
        </CardContent>
      </Card>
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    timestamp,
    metric,
    latitude,
    longitude,
    data
  } = state.chart;
  return {
    loading,
    timestamp,
    metric,
    latitude,
    longitude,
    data
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_CHART_DATA
    })
});

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(ChartVisualization)
);
