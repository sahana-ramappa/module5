import { useEffect, useState } from 'react';
import useSWR from 'swr'

function LastSalePage(props){
    const [sales, setSale ] = useState(props.sales);
    // const [isloading, setIsLoading] = useState(false);

    const { data, error } = useSWR('https://nextjs-course-8d9a3-default-rtdb.firebaseio.com/sale.json');

    useEffect(() => {
        if (data) {
          const transformedSales = [];
    
          for (const key in data) {
            transformedSales.push({
              id: key,
              username: data[key].username,
              volume: data[key].volume,
            });
          }
    
          setSale(transformedSales);
        }
      }, [data]);
    
    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch('https://nextjs-course-8d9a3-default-rtdb.firebaseio.com/sale.json')
    //     .then((response) => response.json())
    //     .then((data) => {
    //      const transformedsale =[];

    //      for (const key in data){
    //          transformedsale.push({
    //              id:key,
    //              username: data[key].username,
    //              volume: data[key].volume,
    //             });
    //      }

    //       setSale(transformedsale);
    //       setIsLoading(false);
    //     });

    // }, []);
    if (error){
        return <p>fail..</p>;
    }

    if (!data && !sales) {
        return <p>Loading...</p>;
      }
      
    return (
    <ul>
     {sales.map((sale)=>(
         <li key={sale.id}>
             {sale.username} - ${sale.volume}
        </li>
     ))}
    </ul>
    );
}

export async function getStaticProps() {
    const response = await fetch(
        'https://nextjs-course-8d9a3-default-rtdb.firebaseio.com/sales.json'
      );
      const data = await response.json();
    
      const transformedSales = [];
    

         for (const key in data){
             transformedSales.push({
                 id:key,
                 username: data[key].username,
                 volume: data[key].volume,
                });

  }
  return { props: { sales: transformedSales }};

}
export default LastSalePage;