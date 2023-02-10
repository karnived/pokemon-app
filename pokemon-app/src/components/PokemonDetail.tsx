import { Pokemon } from "@/utils/types";
import { useEffect, useState } from "react";
import classNames from "classnames";
import PokemonDetailAbout from "@/components/PokemonDetailAbout";
import { mapPokemonDetails, Section, SectionsProps } from "@/utils/mapPokemonDetails";
import PokemonDetailStats from "@/components/PokemonDetailStats";

type PokemonDetailProps = {
  data: Pokemon;
}

const PokemonDetail = ({ data }: PokemonDetailProps) => {
  const [sections, setSections] = useState<SectionsProps>();
  const [selectedSection, setSelectedSection] = useState<Section>(Section.About);

  useEffect(() => setSections(mapPokemonDetails(data)), [data])

  if (!sections) return <></>;

  const renderSection = () => {
    switch (selectedSection) {
      case Section.About:
        return <PokemonDetailAbout data={sections[selectedSection]}/>
      case Section.Stats:
        return <PokemonDetailStats data={sections[selectedSection]}/>
      default:
        return <></>
    }
  }

  return (<header>
    <ul className={styles.tabs}>
      {Object.entries(Section).map(([key, value]) => (
          <li key={key}
              className={classNames(styles.tab,
                  { 'border-b-2 border-blue-500 text-gray-900': selectedSection === value },
                  { 'text-gray-300': selectedSection !== value }
              )}
              onClick={() => setSelectedSection(value)}>
            <h3>{key}</h3>
          </li>
      ))}
    </ul>
    <section>
      {renderSection()}
    </section>
  </header>)
}

const styles = {
  tabs: 'flex justify-around border-b mb-4',
  tab: 'pb-4 font-semibold cursor-pointer',
}

export default PokemonDetail;