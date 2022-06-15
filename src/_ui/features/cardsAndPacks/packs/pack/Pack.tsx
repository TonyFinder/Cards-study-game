import React from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import styles from './pack.module.scss';
import {Link} from 'react-router-dom';
import {COLORS, ROUTE_PATHS} from '../../../../../utils/_values';
import {SortButton} from '../../../../common/_superComponents/SortButton/SortButton';
import {useAppDispatch, useCustomSelector} from '../../../../../_bll/main/store';
import {updateParams} from '../../../../../_bll/features/cards/packsReducer';
import {LoadingStatusType} from '../../../../../utils/enums';
import ModalDeleteContainer from "../../../modal/packModal/deletePack/ModalDeleteContainer";
import ModalUpdateContainer from "../../../modal/packModal/updatePack/ModalUpdateContainer";

export type PackPropsType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    cardsCount: number | string
    created: string
    updated: string
    header?: boolean
    sort: string[]
}

export const Pack: React.FC<PackPropsType> = (props) => {

    const {
        _id,
        name,
        cardsCount,
        updated,
        user_name,
        created,
        header,
        sort,
        user_id,
    } = props;

    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)
    const userId = useCustomSelector<string>(state => state.profile._id)
    const dispatch = useAppDispatch()
    const disabled = loading === LoadingStatusType.active

    const onClickHandler = (e: string) => {
        // определяем, на какой колонке находится фильтр
        if (loading === LoadingStatusType.active) return
        sort[1] === e
            // определяем как отсортирована колонка
            ? sort[0] === '0'
                ? dispatch(updateParams({sortPacks: `1${sort[1]}`, page: 1}))
                : dispatch(updateParams({sortPacks: '0updated', page: 1}))
            : dispatch(updateParams({sortPacks: `0${e}`, page: 1}))
    }

    return (
        <div key={_id} className={styles.row}>
            <div className={styles.name}>
                {header
                    ? <SortButton title={name}
                                  value={sort[1] === 'name' ? sort[0] : '2'}
                                  color={COLORS.MAIN_DARK}
                                  onClick={() => onClickHandler('name')}/>
                    : <Link to={`${ROUTE_PATHS.CARDS}/${props._id}/${name}`}>{name}</Link>
                }
            </div>
            <div className={styles.cards}>
                {header
                    ? <SortButton title={cardsCount}
                                  value={sort[1] === 'cardsCount' ? sort[0] : '2'}
                                  color={COLORS.MAIN_DARK}
                                  onClick={() => onClickHandler('cardsCount')}/>
                    : cardsCount
                }
            </div>
            <div className={styles.updated}>
                {header
                    ? <SortButton title={updated}
                                  value={sort[1] === 'updated' ? sort[0] : '2'}
                                  color={COLORS.MAIN_DARK}
                                  onClick={() => onClickHandler('updated')}/>
                    : new Date(String(updated)).toLocaleString()
                }
            </div>
            <div className={styles.createdBy}>
                {header
                    ? <SortButton title={user_name}
                                  value={sort[1] === 'user_name' ? sort[0] : '2'}
                                  color={COLORS.MAIN_DARK}
                                  onClick={() => onClickHandler('user_name')}/>
                    : user_name
                }
            </div>
            <div className={styles.actions}>

                {header
                    ? <SortButton title={created}
                                  value="2"
                                  color="#fd974f"/>
                    : <div>
                        {user_id === userId
                            ? <ModalDeleteContainer disabled={disabled} packId={_id} packName={name}/>
                            : null}
                        {user_id === userId
                            ? <ModalUpdateContainer disabled={disabled} packId={_id} packName={name}/>
                            : null}
                        <Button color={COLORS.MAIN_DARK}>Learn</Button>
                    </div>
                }
            </div>

        </div>
    );
};

