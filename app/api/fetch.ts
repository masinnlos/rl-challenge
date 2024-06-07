import { RestObject } from "../types"

export function fetchAllObjects(
    setData: (data: RestObject[]) => void,
    setLoading: (loading: boolean) => void
) {
    console.log("Loading all objects...")
    fetch('https://api.restful-api.dev/objects')
        .then((res) => res.json())
        .then((data) => {
            setData(data)
            setLoading(false)
        })
}