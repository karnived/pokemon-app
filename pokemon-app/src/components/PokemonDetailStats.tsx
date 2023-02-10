import { SectionStats } from "@/utils/mapPokemonDetails";
import classNames from "classnames";
import { useMemo } from "react";

const mapStatNames = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

type StatName = keyof typeof mapStatNames;

const MAX_TOTAL_STATS = Object.keys(mapStatNames).length * 100;

const StatBar = ({ value }: { value: number }) => {
  return <div className={styles.bar}>
    <div className={classNames(styles.barValue,
        { 'bg-green-500': value >= 50 },
        { 'bg-red-500': value < 50 }
    )} style={{ width: `${value > 100 ? 100 : value}%` }}/>
  </div>
}

const PokemonDetailStats = ({ data }: { data: SectionStats }) => {
  const totalStats = useMemo(() => data.map(item => item.value).reduce((acc, val) => acc += val, 0), [data])

  return <ul className={styles.list}>
    {data.map((item) => {
      const label = mapStatNames[item.name as StatName];

      return (
          <li key={item.name} className={styles.item} style={{ gridTemplateColumns: '90px 50px auto' }}>
            <h3 className={styles.key}>{label}</h3>
            <p>{item.value}</p>
            <StatBar value={item.value}/>
          </li>
      )
    })}
    <li className={styles.item} style={{ gridTemplateColumns: '90px 50px auto' }}>
      <h3>Total</h3>
      <p>{totalStats}</p>
      <StatBar value={totalStats / MAX_TOTAL_STATS * 100}/>
    </li>
  </ul>
}

const styles = {
  list: 'grid gap-y-4',
  item: 'grid items-center',
  key: 'text-gray-400 font-medium',
  bar: 'w-full bg-gray-200 h-1 rounded-lg',
  barValue: 'h-1'
}

export default PokemonDetailStats;