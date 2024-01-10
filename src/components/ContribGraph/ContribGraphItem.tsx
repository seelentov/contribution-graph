import cn from 'classnames'
import { FC, useState } from 'react'
import { formatDateToLongString } from '../../utils/date/formatDateToLongString'
import styles from './ContribGraph.module.scss'
import { contribColor, contribInfo } from './config'

export interface IContribGraphItemProps {
  date?: Date,
  contrib: number
}

export const ContribGraphItem: FC<IContribGraphItemProps> = ({
  date, contrib
}) => {

  const [moreInfoView, setMoreInfoView] = useState<boolean>(false)

  const contribBreakpoint =
    contrib === 0 ? 0 :
      contrib > 0 && contrib < 10 ? 1 :
        contrib > 9 && contrib < 20 ? 2 :
          contrib > 19 && contrib < 30 ? 3 :
            4


  return (
    <div className={cn(styles.item, moreInfoView && styles.activeItem)} onClick={() => setMoreInfoView(prev => !prev)} style={{
      backgroundColor: contribColor[contribBreakpoint]
    }}>
      {moreInfoView &&
        <div className={styles.info} onMouseLeave={() => setMoreInfoView(false)}>
          <p>{contribInfo[contribBreakpoint]}</p>
          {date && <p>{formatDateToLongString(date)}</p>}
        </div>
      }
    </div>
  );
}