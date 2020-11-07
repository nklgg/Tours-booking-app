import React from 'react';
import Card from '../Card/Card';
import MyLoader from '../../utils/MyLoader/MyLoader';
const CardList = ({ data, slug }) => {
	console.log(slug);

	return (
		<div style={{ height: '100%' }} className='card-container'>
			{data.loading ? (
				<>
					<MyLoader />
					<MyLoader />
					<MyLoader />
					<MyLoader />
					<MyLoader />
					<MyLoader />
					<MyLoader />
					<MyLoader />
					<MyLoader />
				</>
			) : (
				data.tours.map((el) => {
					return <Card data={el} />;
				})
			)}
			{/* {data.tours.map(el => {
        return (
          <Card data={el} />
        )
      })} */}
		</div>
	);
};

export default CardList;
