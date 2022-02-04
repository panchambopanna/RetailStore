import ReactLoading from 'react-loading';

const Loading = () => {
  return(
    <div style={{alignItems:'center', margin:'auto',padding:'auto', width:'10%'}}>
      <ReactLoading type="bubbles" color="black" />
    </div>
  )
};

export default Loading;
