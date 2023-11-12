export const Graph = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <p>{item.totalCases}</p>
          <p>{item.totalDeaths}</p>
          <br />
        </div>
      ))}
    </div>
  );
};
