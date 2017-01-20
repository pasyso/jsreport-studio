import style from './EntityTreeInputSeach.scss'

export default ({ setFilter }) => {
  return (
    <div className={style.search}>
      <input type='text' onChange={(ev) => setFilter(ev.target.value)} />
    </div>
  )
}
