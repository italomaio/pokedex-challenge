export default function ({ $nuxt, $axios, ...rest }) {
  $axios.onRequest((config) => {
    // console.log(app.vm)
    // store.$nextTick(() => {
    console.log(rest.nuxt.$loading)
    rest.nuxt.$loading.start()
    return config
    // })
  })

  $axios.onResponse((response) => {
    // store.$nextTick(() => {
    $nuxt.$loading.finish()
    return response
    // })
  })

  $axios.onError((error) => {
    //     // store.$nextTick(() => {
    $nuxt.$loading.finish()
    return Promise.reject(error)
    //     // })
  })
}
