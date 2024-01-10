import { FC, useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { getContribData } from '../../core/api/api';
import { ContribData } from '../../core/types/contribution';
import styles from './ContribGraph.module.scss';
import { ContribGraphItem } from './ContribGraphItem';
export interface IContribGraphProps {

}

export const ContribGraph: FC<IContribGraphProps> = () => {

  const [contribData, setContribData] = useState<ContribData[]>()
  const [months, setMonths] = useState<string[]>()
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    getContribData()
      .then((response) => {
        setContribData(response.contribsArray)
        setMonths(response.months)
      })
      .then(() => setLoading(false))
      .catch((e) => {
        setLoading(false)
        alert(e)
      })
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.months}>
        {months?.map(month => <p>{month}</p>)}
      </div>
      <div className={styles.bottom}>
        <div className={styles.days}>
          <p>Пн</p>
          <p>Ср</p>
          <p>Пт</p>
        </div>
        <div className={styles.items}>
          {loading && <div className={styles.loading}>
            <BounceLoader color={'rgb(172, 213, 242)'} />
          </div>}

          {contribData?.map(({ date, contrib }, key) => <ContribGraphItem date={date} contrib={contrib} key={key} />)}

          {!contribData && !loading && <div className={styles.loading}>
            <p>Ничего не найдено!</p>
          </div>}
        </div>
      </div>
      <div className={styles.example}>
        <p>Меньше</p>
        <ContribGraphItem contrib={0} />
        <ContribGraphItem contrib={5} />
        <ContribGraphItem contrib={15} />
        <ContribGraphItem contrib={25} />
        <ContribGraphItem contrib={35} />
        <p>Больше</p>
      </div>
    </div>
  );
}