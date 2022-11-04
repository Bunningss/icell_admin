import './Hamburger.scss';

const Hamburger = ({ active, setActive }) => {
  return (
    <div onClick={() => setActive(!active)} className={active ? 'hamburger active' : 'hamburger'}>
        <span className="line"></span><span className="line"></span><span className="line"></span>
    </div>
  )
}

export default Hamburger