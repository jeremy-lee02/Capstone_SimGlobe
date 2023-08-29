
import {useState, useEffect} from 'react'
import { preset1, preset2, preset3,preset4, preset5, preset6, preset7, preset8, preset9, updatePresetData, check_and_update_PresetData } from '../utils/presetData'
import { PresetValue } from '../../typing'


type InitValue = {
    label: string,
    value: number
}



export default function usePresetData(name: string, init_data: Array<InitValue>) {
    const [preset_1, setPreset1] = useState(preset1)
    const [preset_2, setPreset2] = useState(preset2)
    const [preset_3, setPreset3] = useState(preset3)
    const [preset_4, setPreset4] = useState(preset4)
    const [preset_5, setPreset5] = useState(preset5)
    const [preset_6, setPreset6] = useState(preset6)
    const [preset_7, setPreset7] = useState(preset7)
    const [preset_8, setPreset8] = useState(preset8)
    const [preset_9, setPreset9] = useState(preset9)
    const [data, setData] = useState<Array<InitValue>>(init_data)
    const [preset, setPreset] = useState<{ [key: string]: PresetValue }>({
        small_small: preset_1,
        small_medium: preset_2,
        small_big: preset_3,
        medium_small: preset_4,
        medium_medium: preset_5,
        medium_big: preset_6,
        big_small: preset_7,
        big_medium: preset_8,
        big_big: preset_9,
    });

    useEffect(()=>{
        createInitData()
    },[name])
    useEffect(()=>{
        updateData()
        // updateStorageData();
        // console.log("Save changes")

    },[data])

    useEffect(()=>{
        updateStorageData();

    },[updateData])


    function createInitData() {
        switch (name) {
        case "small_small":
            setData(prev => {
                const newData = [...prev]
                newData.forEach(d => {
                    d.value = updatePresetData(d.label, preset_1)
                })
                return newData
            })   
            break;
        case "small_medium":
            setData(prev => {
                const newData = [...prev]
                newData.forEach(d => {
                    d.value = updatePresetData(d.label, preset_2)
                })
                return newData
            })    
            break;
        case "small_big":
            setData(prev => {
                const newData = [...prev]
                newData.forEach(d => {
                    d.value = updatePresetData(d.label, preset_3)
                })
                return newData
            })   
            break;
        case "medium_small":
            setData(prev => {
                const newData = [...prev]
                newData.forEach(d => {
                    d.value = updatePresetData(d.label, preset_4)
                })
                return newData
            })   
            break;
        case "medium_medium":
            setData(prev => {
                const newData = [...prev]
                newData.forEach(d => {
                    d.value = updatePresetData(d.label, preset_5)
                })
                return newData
            })   
            break;
        case "medium_big":
            setData(prev => {
                const newData = [...prev]
                newData.forEach(d => {
                    d.value = updatePresetData(d.label, preset_6)
                })
                return newData
            })   
            break;
        case "big_small":
            setData(prev => {
                const newData = [...prev]
                newData.forEach(d => {
                    d.value = updatePresetData(d.label, preset_7)
                })
                return newData
            })   
            break;
        case "big_medium":
            setData(prev => {
                const newData = [...prev]
                newData.forEach(d => {
                    d.value = updatePresetData(d.label, preset_8)
                })
                return newData
            })   
            break;
        case "big_big":
            setData(prev => {
                const newData = [...prev]
                newData.forEach(d => {
                    d.value = updatePresetData(d.label, preset_9)
                })
                return newData
            })   
            break;
        default:
            break;
        }
    }

    function updateData() {
        switch (name) {
            case "small_small":
                setPreset1(prev => {
                    let updatePrev = {...prev}
                    data.forEach(d => {
                        updatePrev = check_and_update_PresetData(d.label, d.value, updatePrev)
                    })
                    setPreset(prev =>{
                        return {
                            small_small: updatePrev,
                            small_medium: prev.small_medium,
                            small_big: prev.small_big,
                            medium_small: prev.medium_small,
                            medium_medium: prev.medium_medium,
                            medium_big: prev.medium_big,
                            big_small: prev.big_small,
                            big_medium: prev.big_medium,
                            big_big: prev.big_big,
                        }
                    })
                    return updatePrev
                })
                break;
            case "small_medium":
                setPreset2(prev => {
                    let updatePrev = {...prev}
                    data.forEach(d => {
                        updatePrev = check_and_update_PresetData(d.label, d.value, updatePrev)
                    })
                    setPreset(prev =>{
                        return {
                            small_small: prev.small_small,
                            small_medium: updatePrev,
                            small_big: prev.small_big,
                            medium_small: prev.medium_small,
                            medium_medium: prev.medium_medium,
                            medium_big: prev.medium_big,
                            big_small: prev.big_small,
                            big_medium: prev.big_medium,
                            big_big: prev.big_big,
                        }
                    })
                    return updatePrev
                })   
                break;
            case "small_big":
                setPreset3(prev => {
                    let updatePrev = {...prev}
                    data.forEach(d => {
                        updatePrev = check_and_update_PresetData(d.label, d.value, updatePrev)
                    })
                    setPreset(prev =>{
                        return {
                            small_small: prev.small_small,
                            small_medium: prev.small_medium,
                            small_big: updatePrev,
                            medium_small: prev.medium_small,
                            medium_medium: prev.medium_medium,
                            medium_big: prev.medium_big,
                            big_small: prev.big_small,
                            big_medium: prev.big_medium,
                            big_big: prev.big_big,
                        }
                    })
                    return updatePrev
                })  
                break;
            case "medium_small":
                setPreset4(prev => {
                    let updatePrev = {...prev}
                    data.forEach(d => {
                        updatePrev = check_and_update_PresetData(d.label, d.value, updatePrev)
                    })
                    setPreset(prev =>{
                        return {
                            small_small: prev.small_small,
                            small_medium: prev.small_medium,
                            small_big: prev.small_big,
                            medium_small: updatePrev,
                            medium_medium: prev.medium_medium,
                            medium_big: prev.medium_big,
                            big_small: prev.big_small,
                            big_medium: prev.big_medium,
                            big_big: prev.big_big,
                        }
                    })
                    return updatePrev
                }) 
                break;
            case "medium_medium":
                setPreset5(prev => {
                    let updatePrev = {...prev}
                    data.forEach(d => {
                        updatePrev = check_and_update_PresetData(d.label, d.value, updatePrev)
                    })
                    setPreset(prev =>{
                        return {
                            small_small: prev.small_small,
                            small_medium: prev.small_medium,
                            small_big: prev.small_big,
                            medium_small: prev.medium_small,
                            medium_medium: updatePrev,
                            medium_big: prev.medium_big,
                            big_small: prev.big_small,
                            big_medium: prev.big_medium,
                            big_big: prev.big_big,
                        }
                    })
                    return updatePrev
                })
                break;
            case "medium_big":
                setPreset6(prev => {
                    let updatePrev = {...prev}
                    data.forEach(d => {
                        updatePrev = check_and_update_PresetData(d.label, d.value, updatePrev)
                    })
                    setPreset(prev =>{
                        return {
                            small_small: prev.small_small,
                            small_medium: prev.small_medium,
                            small_big: prev.small_big,
                            medium_small: prev.medium_small,
                            medium_medium: prev.medium_medium,
                            medium_big: updatePrev,
                            big_small: prev.big_small,
                            big_medium: prev.big_medium,
                            big_big: prev.big_big,
                        }
                    })
                    return updatePrev
                })  
                break;
            case "big_small":
                setPreset7(prev => {
                    let updatePrev = {...prev}
                    data.forEach(d => {
                        updatePrev = check_and_update_PresetData(d.label, d.value, updatePrev)
                    })
                    setPreset(prev =>{
                        return {
                            small_small: prev.small_small,
                            small_medium: prev.small_medium,
                            small_big: prev.small_big,
                            medium_small: prev.medium_small,
                            medium_medium: prev.medium_medium,
                            medium_big: prev.medium_big,
                            big_small: updatePrev,
                            big_medium: prev.big_medium,
                            big_big: prev.big_big,
                        }
                    })
                    return updatePrev
                })
                break;
            case "big_medium":
                setPreset8(prev => {
                    let updatePrev = {...prev}
                    data.forEach(d => {
                        updatePrev = check_and_update_PresetData(d.label, d.value, updatePrev)
                    })
                    setPreset(prev =>{
                        return {
                            small_small: prev.small_small,
                            small_medium: prev.small_medium,
                            small_big: prev.small_big,
                            medium_small: prev.medium_small,
                            medium_medium: prev.medium_medium,
                            medium_big: prev.medium_big,
                            big_small: prev.big_small,
                            big_medium: updatePrev,
                            big_big: prev.big_big,
                        }
                    })
                    return updatePrev
                })
                break;
            case "big_big":
                setPreset9(prev => {
                    let updatePrev = {...prev}
                    data.forEach(d => {
                        updatePrev = check_and_update_PresetData(d.label, d.value, updatePrev)
                    })
                    setPreset(prev =>{
                        return {
                            small_small: prev.small_small,
                            small_medium: prev.small_medium,
                            small_big: prev.small_big,
                            medium_small: prev.medium_small,
                            medium_medium: prev.medium_medium,
                            medium_big: prev.medium_big,
                            big_small: prev.big_small,
                            big_medium: prev.big_medium,
                            big_big: updatePrev,
                        }
                    })
                    return updatePrev
                })
                break;
            default:
                break;
            }
    }

    function updateStorageData() {
        //localStorage.setItem('presets', JSON.stringify({preset_1, preset_2, preset_3, preset_4, preset_5, preset_6, preset_7, preset_8, preset_9}));
        localStorage.setItem('presets', JSON.stringify(preset));
        localStorage.setItem('data', JSON.stringify(data));
    }

    return {data, updateData}

}