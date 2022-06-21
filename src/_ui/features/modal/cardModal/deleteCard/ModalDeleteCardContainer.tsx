import React, {useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {useAppDispatch} from "../../../../../_bll/main/store";
import styles from "../../modalTemplate.module.scss"
import {deleteCardTC} from "../../../../../_bll/features/cards/cardsReducer";
import {COLORS} from '../../../../../utils/_values';
import {Modal} from '../../Modal';

type ModalDeleteContainerType = {
    cardID: string
    disabled: boolean
    cardName: string
}


export const ModalDeleteCardContainer: React.FC<ModalDeleteContainerType> = ({cardID, cardName, disabled}) => {
    const [show, setShow] = useState(false);

    const dispatch = useAppDispatch()

    const onClickDeleteHandler = () => {
        dispatch(deleteCardTC(cardID, cardName))
        setShow(false)
    }

    return (
        <>
            <Button disabled={disabled}
                    onClick={() => setShow(true)}
                    color={'red'} className={styles.button}>
                Delete</Button>
            <Modal backgroundOnClick={() => setShow(false)} show={show}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>Delete Card: "{cardName}"</h3>
                    </div>

                    <p className={styles.text}>
                        Do you really want to remove this card?
                    </p>

                    <div className={styles.buttons}>
                        <Button color='red' onClick={onClickDeleteHandler}>Delete</Button>
                        <Button color={COLORS.HEADER_BOTTOM} onClick={() => setShow(false)}>Cancel</Button>
                    </div>

                </div>
            </Modal>
        </>
    )
}