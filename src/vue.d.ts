declare module '*.vue'{
    import { defineComponent } from 'vue'
    const Component:ReturnType<typeof defineComponent>
    export default Component
}

declare module 'toastify-js'{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component:any
    export default Component
}