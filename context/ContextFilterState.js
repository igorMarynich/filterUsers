import React, {useState} from 'react'
import ContextFilter from './ContextFilter'

const ContextFilterState = ({children}) => {
    const [titleFilter, setTitleFilter] = useState('')
    const [fromAge, setFromAge] = useState(0)
    const [toAge, setToAge] = useState(200)
    const [selectedValue, setSelectedValue] = useState('both');

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
            handleSubmit
        }}>
            {children}
        </ContextFilter.Provider>
    )
}

export default ContextFilterState


