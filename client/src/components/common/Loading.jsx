import ReactLoading from 'react-loading';

const Loading = (props) => {
  return (
    <>
      <div style={{ alignItems: 'center', margin: '20px auto', padding: 'auto', width: "120px" }}>
        <ReactLoading type="bubbles" color="black" width="120px"/>
      </div>
      
      {props.message && <h2 style={{ marginTop: '20px', textAlign: "center" }}>{props.message}</h2>}
      
    </>
  )
};

export default Loading;
