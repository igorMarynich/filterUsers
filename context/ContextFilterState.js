import React, {useState} from 'react'
import ContextFilter from './ContextFilter'

const ContextFilterState = ({children}) => {
    const [titleFilter, setTitleFilter] = useState('')
    const [fromAge, setFromAge] = useState('')
    const [toAge, setToAge] = useState('')
    const [gender, setGender] = useState('')

    const handleSubmit = () => {
        setTitleFilter('')
        setFromAge('')
        setToAge('')
        setGender('')
    }

    return (
        <ContextFilter.Provider value={{
            titleFilter, setTitleFilter,
            fromAge, setFromAge,
            toAge, setToAge,
            gender, setGender,
            handleSubmit
        }}>
            {children}
        </ContextFilter.Provider>
    )
}

export default ContextFilterState