import './InfoBox.scss';

const InfoBox = ({data}) => {
  return (
    <div className='infobox'>
        <h2 className="header infobox-header">total {data.number}</h2>
        <p className="text-regular infobox-text">{data.title}</p>
    </div>
  )
}

export default InfoBox