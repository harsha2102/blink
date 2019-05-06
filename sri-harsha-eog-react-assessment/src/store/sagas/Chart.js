import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchChartData() {
  const { error, data } = yield call(API.getChartData);
  if (error) {
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  yield put({ type: actions.CHART_DATA_RECEIVED, data: data });
}

function* watchAppLoad() {
  yield all([takeEvery(actions.FETCH_CHART_DATA, watchChartData)]);
}

export default [watchAppLoad];
