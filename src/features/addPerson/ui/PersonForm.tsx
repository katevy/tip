import { personListStore } from "@entities/person";
import { Person } from "@src/shared/api/Person/models";
import { Button } from "@src/shared/ui/button";
import { Input } from "@src/shared/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './person-form.scss'

type PersonFields = keyof Person

const fields: {
    name: PersonFields
    label: string
    type: string
    regex: RegExp
}[] = [
        { name: "name", label: "Имя", type: "text", regex: /^.+$/ },
        { name: "height", label: "Рост (см)", type: "text", regex: /^\d+$/ },
        { name: "mass", label: "Вес (кг)", type: "text", regex: /^\d+$/ },
        { name: "hair_color", label: "Цвет волос", type: "text", regex: /^.+$/ },
        { name: "gender", label: "Пол", type: "text", regex: /^(male|female|other)$/i },
    ]

export const PersonForm = () => {

    const navigate = useNavigate()

    const { addPerson } = personListStore

    const [formData, setFormData] = useState<Person>({
        id: Date.now(),
        name: "",
        height: "",
        mass: "",
        hair_color: "",
        gender: "",
        isNew: true
    })

    const [errors, setErrors] = useState<Partial<Record<PersonFields, string>>>({})

    const handleChange = (key: PersonFields, value: string | boolean) => {

        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }))

        setErrors((prev) => ({
            ...prev,
            [key]: value ? "" : "Это поле обязательно для заполнения",
        }))
    }

    const validateForm = () => {
        const newErrors: Partial<Record<PersonFields, string>> = {}
        Object.keys(formData).forEach((key) => {
            const field = fields.find((f) => f.name === key)
            const value = formData[key as PersonFields]

            if (field && !field.regex.test(value as string)) {
                newErrors[key as keyof Person] = "Некорректное значение";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateForm()) {
            alert("Запись успешно добавлена!")
            console.log(formData)
            addPerson(formData)
            navigate("/")
        }
    }

    const handleCancel = () => {
        navigate("/")
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {fields.map(({ name, label, type }) => (
                <div className="form-group" key={name}>
                    <label className="label">{label}:</label>
                    <Input
                        type={type}
                        name={name}
                        value={formData[name]?.toString() || ''}
                        onChange={(val) => handleChange(name, val)}
                    />
                    {errors[name] && (
                        <span className="error">{errors[name]}</span>
                    )}
                </div>
            ))}
            <div className="button-container">
                <Button type="button" onClick={handleCancel}>Отмена</Button>
                <Button type="submit">Добавить запись</Button>
            </div>
        </form>
    );
};
