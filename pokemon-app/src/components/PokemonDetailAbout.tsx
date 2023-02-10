import { SectionAbout } from "@/utils/mapPokemonDetails";

const About = ({ data }: { data: SectionAbout }) => {
  return (
      <ul className={styles.list}>
        {data && Object.keys(data).map((k) => {
          const key = k as keyof SectionAbout;
          return (
              <li key={k} className={styles.item} style={{ gridTemplateColumns: '90px 1fr' }}>
                <h3 className={styles.key}>{key}</h3>
                {(data[key] as Array<string>)?.length > 0
                    ? (<p> {(data[key] as Array<string>).reduce((arr, value) => arr + `${value}, `, '')}</p>)
                    : (<p>{data[key]}</p>)}
              </li>
          )
        })}
      </ul>
  )
}

export default About;

const styles = {
  list: 'capitalize grid gap-y-4',
  item: 'grid',
  key: 'text-gray-400 font-medium',
}