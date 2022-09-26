// this page shows the info in the console.log()
//prerequisite run xampp
export default function Blog(props) {
    const {invc} =props;
    console.log(invc);
    return <div> 
                <h1>Welcome to the blog page.....</h1>
                    {
                          // render invoive here here
                          invc.map(
                          (item)=> <>
                                      <h2>{item.month}</h2>
                                      <p>{item.net_payable}</p>
                                      <br/>
                                    </>
                      )

                    }
            </div>
  }
  
  export async function getStaticProps(context) {
    
    const res = await fetch("http://localhost:3000/api/invc");
    const invc = await res.json();
      
    return {
      props: {invc} // will be passed to our blog page component as props
      };
  }