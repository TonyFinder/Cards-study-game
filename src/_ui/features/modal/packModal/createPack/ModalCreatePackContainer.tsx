import React, {useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import Modal from "../../Modal";
import {useAppDispatch} from "../../../../../_bll/main/store";
import {createPackTC, updateParams} from "../../../../../_bll/features/cards/packsReducer";
import {Input} from "../../../../common/_superComponents/Input/Input";
import {Checkbox} from "../../../../common/_superComponents/Checkbox/Checkbox";
import {COLORS} from "../../../../../utils/_values";
import styles from "../../modalStyle.module.scss"

type ModalCreatePackContainerType = {
    disabled: boolean
}

const ModalCreatePackContainer: React.FC<ModalCreatePackContainerType> = ({disabled}) => {
    const [show, setShow] = useState(false);

    const [namePack, setNamePack] = useState("");
    const [cardPrivate, setCardPrivate] = useState(false);


    const dispatch = useAppDispatch()

    const onClickCreateHandler = () => {
        dispatch(createPackTC(
            {
                name: namePack,
                deckCover: "",
                cardPrivate: cardPrivate,
            }
        ))
        dispatch(updateParams({page: 1}))
        setShow(false)
    }

    return (
        <>
            <Button onClick={() => setShow(true)} color={COLORS.MAIN_DARK} disabled={disabled}>Add new pack</Button>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
                width={395}
                height={250}
                // modalOnClick={() => setShow(false)}
                modalClassName={styles.bgColorModal}
                show={show}
            >
                <div className={styles.modal}>
                    <h3>Add new Pack</h3>
                    <Input sign='Name pack' value={namePack} onChange={(e) => setNamePack(e.currentTarget.value)}/>
                    <Checkbox
                        className={styles.checkbox}
                        checked={cardPrivate}
                        onChange={(e) => setCardPrivate(e.currentTarget.checked)}>
                        Private
                    </Checkbox>
                    <div className={styles.button}>
                        <Button onClick={onClickCreateHandler}>Save</Button>
                        <Button color='red' onClick={() => setShow(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalCreatePackContainer;