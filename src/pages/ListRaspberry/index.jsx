import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChoiceRaspberry from './ChoiceRaspberry';
import api from '../../services/api';

export default function Choice() {
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [choiceAll, setChoiceAll] = useState(false)
    const [raspberry, setRaspberry] = useState([])
    const [searching, setSearching] = useState(false)

    useEffect(() => {
        loadRaspberry();
    }, []);

    function loadRaspberry(searchValue) {
        if (!searchValue) {
            api.get(`/raspberries-report`).then((response) => {
                setRaspberry(response.data);
            })
        } else {
            let filter = {
                order: 'name',
                where: {}
            };

            filter.where = {
                ...filter.where,
                or: [
                    { id: { like: `.*${searchValue}.*` } },
                    { serialNumber: { like: `.*${searchValue}.*`, options: 'i' } },
                    { propertyIdentification: { like: `.*${searchValue}.*` } }
                ]
            };
            setSearching(true)
            api.get(`/raspberries-report?filter=${JSON.stringify(filter)}`).then((response) => {
                setRaspberry(response.data);
            }).finally(() => setSearching(false))
        }
    }

    const onChoosing = (value) => {
        history.push(`/monitoring-module/${value.id}`);
    }

    const printAll = (raspberries) => {
        setChoiceAll(true)
    }

    return (
        <>
            <ChoiceRaspberry
                title='Acessar Monitoramento de Módulo de Mensuração'
                onChoosing={onChoosing}
                printAll={() => printAll()}
                loadRaspberry={loadRaspberry}
                raspberry={raspberry}
                searching={searching}
            />
        </>
    );
}