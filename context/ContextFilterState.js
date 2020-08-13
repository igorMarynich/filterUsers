import React, {useState} from 'react'
import ContextFilter from './ContextFilter'

const ContextFilterState = ({children}) => {
    const [titleFilter, setTitleFilter] = useState('')
    const [fromAge, setFromAge] = useState(0)
    const [toAge, setToAge] = useState(200)
    const [selectedValue, setSelectedValue] = useState('both');
    const [modalVisible, setModalVisible] = useState(false);
    const [idRes, setIdRes] = useState(0)
    const [modalVisibleFinish, setModalVisibleFinish] = useState(false)

    const handleSubmit = () => {
        setTitleFilter('')
        setFromAge(0)
        setToAge(200)
        setSelectedValue('both')
    }

    return (
        <ContextFilter.Provider value={{
            titleFilter, setTitleFilter,
            fromAge, setFromAge,
            toAge, setToAge,
            selectedValue, setSelectedValue,
            handleSubmit,
            modalVisible, setModalVisible,
            idRes, setIdRes,
            modalVisibleFinish, setModalVisibleFinish
        }}>
            {children}
        </ContextFilter.Provider>
    )
}

export default ContextFilterState


