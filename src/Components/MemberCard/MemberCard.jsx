import './MemberCard.scss';

const MemberCard = ({ member }) => {

  return (
    <div className='member-card'>
        {
            <div className="container">
                <div className="keys col">
                    {
                        Object.keys(member).map((key, indx) => (
                            <p className="text-regular family-text" key={indx}>{key}</p>
                        ))
                    }
                </div>
                <div className="values col">
                    {
                        Object.values(member).map((value, indx) => (
                            <p className="text-regular family-text" key={indx}>{value}</p>
                        ))
                    }
                </div>
            </div>
        }
    </div>
  )
}

export default MemberCard