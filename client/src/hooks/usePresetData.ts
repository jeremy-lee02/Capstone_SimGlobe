
import {useState, useEffect} from 'react'
import { preset1, preset2, preset3,preset4, preset5, preset6, preset7, preset8, preset9, updatePresetData } from '../utils/presetData'

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

    useEffect(()=>{
        createInitData()
    },[name])

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

    return {data}

}