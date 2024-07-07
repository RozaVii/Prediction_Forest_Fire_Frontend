export class ComplexIndexModel {

    constructor(id, name, formula, fwis, weatherDataParams, precipitationRecords) {
        this.id = id
        this.name = name
        this.formula = formula
        this.fwis = fwis
        this.weatherDataParams = weatherDataParams
        this.precipitationRecords = precipitationRecords
    }

    static fromResponse(data) {
        const object = new ComplexIndexModel();
        object.id = data.id
        object.name = data.name
        object.formula = data.formula
        object.fwis = data.fwis
        object.weatherDataParams = data.weatherDataParams
        object.precipitationRecords = data.precipitationRecords

        return object
    }

    // Говнокожу до конца
    // Создаёт пару id - name для отображения
    toMainIndex() {
        var result = {
            id: this.id,
            name: this.name
        }

        return result
    }

    getParamsToView() {
        const params = this.weatherDataParams.map(param => {
            const result = {name: param.weatherName, parameter: param.formulaParameter}

            return result
        })

        return params
    }

    getPrecipitationRecordsToView() {
        const params = this.precipitationRecords.map(param => {
            const result = {range: `${param.minValue}-${param.maxValue}`, precipitation: param.value}
            return result
        })

        return params
    }
}
