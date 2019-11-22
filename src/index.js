import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom';
import { api31Call, getPivotSpaceLooks, jsonLabel, hideCategory } from './helpers';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import { aggregators } from 'react-pivottable/Utilities';
import { Grid, Container, Segment } from 'semantic-ui-react';
import { LookDropdown } from './LookDropdown';
import 'react-pivottable/pivottable.css';;
import "semantic-ui-css/semantic.min.css";import { LoadingSvg } from './components/LoadingSvg';
import './index.css'

// list of Aggregators we want to appear in pivot table
const AGGS = ['Count','Average','Sum','Median','Sample Variance','Sample Standard Deviation','Min','Max'
  ,'Sum over Sum','Sum as Fraction of Total','Sum as Fraction of Rows', 'Sum as Fraction of Columns',
  'Count as Fraction of Total','Count as Fraction of Rows', 'Count as Fraction of Columns']
var aggs = {}
AGGS.forEach(key=>{ aggs[key] = aggregators[key]})

function App() {

  const [look, setLook] = useState(undefined);
  const [looks, setLooks] = useState(undefined);
  const [fields, setFields] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [pivot, setPivot] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    initApp();
  },[])

  useEffect( () => {
    if (look) {
      initLook(look);
    }
  },[look])

  async function initApp() {
    const looks = await getPivotSpaceLooks();
    if (looks) {
      setLooks(looks)
    }
  }

  async function initLook(look) {
    setLoading(true)
    if (data) { setData(undefined)}
    if (pivot) { setPivot(undefined)}
    // var dt = await api31Call('GET', `/looks/${look}/run/json`, `limit=-1&apply_formatting=false&apply_vis=false&server_table_calcs=false`)
    var lk = await api31Call('GET',`/looks/${look}`)
    var dt = await api31Call('GET',`/queries/${lk.query.id}/download/json`, `limit=-1`)
    console.log(dt)
    var ex = await api31Call('GET',`/lookml_models/${lk.query.model}/explores/${lk.query.view}`)
    const fl = ex.fields
    setFields(fl.dimensions.concat(fl.measures).filter(o=>{return Object.keys(dt[0]).indexOf(o.name)>-1}))
    setData(dt)
    setLoading(false)
  }

  const ready = (data && fields && !loading)
  var grid_row = <></>
  if (ready) {
    const data_label = jsonLabel(data, fields)
    const hiddenAggs = hideCategory(fields,'dimension')
    const hiddenDragDrop = hideCategory(fields,'measure')
    grid_row = <PivotTableUI
    data={data_label}
    unusedOrientationCutoff={0}
    aggregators={aggs}
    hiddenFromAggregators={hiddenAggs}
    hiddenFromDragDrop={hiddenDragDrop}
    onChange={pivot => {setPivot(pivot)}}
    {...pivot}
  />
  } else {
    grid_row = <LoadingSvg loading={loading}></LoadingSvg>
  }
  return (
    <>
      <Container textAlign='center'>
        <LookDropdown
          setLook={setLook}
          looks={looks}
        ></LookDropdown>
      </Container>
      <Segment
        raised
        id='segment-pivot'
      >
        {grid_row}
      </Segment>
     </>
  );
}

window.addEventListener('load', () => {
  ReactDOM.render( <App />, document.getElementById('app-container'));
}, false); 