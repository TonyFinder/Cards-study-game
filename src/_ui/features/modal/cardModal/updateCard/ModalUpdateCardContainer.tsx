import React, {useEffect, useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {useAppDispatch} from '../../../../../_bll/main/store';
import styles from '../../modalTemplate.module.scss'
import {updateCardTC} from '../../../../../_bll/features/cards/cardsReducer';
import {COLORS} from '../../../../../utils/_values';
import {TextArea} from '../../../cardsAndPacks/cards/components/textArea/TextArea';
import {Modal} from '../../Modal';

type ModalUpdateContainerType = {
    cardId: string
    cardQuestion: string
    cardAnswer: string
    disabled: boolean
}


export const ModalUpdateCardContainer: React.FC<ModalUpdateContainerType> = ({cardId, cardQuestion, cardAnswer, disabled}) => {
    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState(cardQuestion);
    const [answer, setAnswer] = useState(cardAnswer);

    const dispatch = useAppDispatch()

    useEffect(() => {
        setQuestion(cardQuestion)
        setAnswer(cardAnswer)
    }, [show])


    const onClickUpdateHandler = () => {
        dispatch(updateCardTC({_id: cardId, question, answer},question))
        setShow(false)
    }

    const onClickCloseModalHandler = () => {
        setShow(false)
        setQuestion(cardQuestion)
        setAnswer(cardAnswer)
    }

    return (
        <>
            <Button color={COLORS.MAIN_DARK}
                    disabled={disabled}
                    onClick={() => setShow(true)}
                    className={styles.button}>Edit</Button>
            <Modal backgroundOnClick={onClickCloseModalHandler} show={show}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>Change pack: "{cardQuestion}"</h3>
                    </div>

                    <div className={styles.textArea}>
                    <TextArea sign='New question'
                              value={question}
                              color={COLORS.MAIN_DARK}
                              autoFocus
                              onChangeText={(e) => setQuestion(e.currentTarget.value)}/>
                    </div>

                    <div className={styles.textArea}>
                    <TextArea sign='New answer'
                              value={answer}
                              color={COLORS.MAIN_DARK}
                              onChangeText={(e) => setAnswer(e.currentTarget.value)}/>
                    </div>

                    <div className={styles.buttons}>
                        <Button color={COLORS.HEADER_BOTTOM}
                                onClick={onClickUpdateHandler}>Save</Button>
                        <Button color={COLORS.HEADER_BOTTOM}
                                onClick={onClickCloseModalHandler}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}