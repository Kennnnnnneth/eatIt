import { nanoid } from "@reduxjs/toolkit"

const lorem = 'Nullam id enim fringilla, fermentum ligula nec, ornare eros. Phasellus sit amet nisl ullamcorper, vulputate dui vel, sagittis dui. Vivamus bibendum dapibus dui, eu suscipit lectus lobortis eget. Proin nibh urna, congue quis dictum ac, tincidunt luctus justo. Mauris facilisis mauris a arcu finibus suscipit. Nullam sit amet quam lacinia, facilisis turpis lobortis, feugiat tellus. Pellentesque porttitor semper massa, vitae mollis turpis elementum eu. Pellentesque volutpat, metus quis convallis volutpat, risus est mollis leo, ac cursus est massa at leo. Pellentesque augue leo, mollis quis elit nec, fermentum lacinia ex. Suspendisse iaculis vestibulum ultrices. Donec tempor neque at nibh ornare, sed sagittis turpis efficitur.'
export default [
    {
        title: 'sadsa',
        data: [[0, 1], [2, 3], [4, 5]].map((e) => {
            const name1 = lorem.slice(e[0] * 5, e[0] * 5 + 10)
            const price1 = Math.floor(Math.random() * (500) + 100)
            const img1 = e[0]
            const category1 = lorem.slice(e[1] * 4, e[1] * 4 + 5)
            const star1 = Math.floor(Math.random() * (4) + 1)
            const name2 = lorem.slice(e[1] * 5, e[1] * 5 + 10)
            const price2 = Math.floor(Math.random() * (500) + 100)
            const img2 = e[1]
            const category2 = lorem.slice(e[1] * 4, e[1] * 4 + 5)
            const star2 = Math.floor(Math.random() * (4) + 1)
            return [
                {
                    name: name1,
                    price: price1,
                    img: img1,
                    category: category1,
                    star:star1,
                    id:nanoid()
                },
                {
                    name: name2,
                    price: price2,
                    img: img2,
                    category: category2,
                    star:star2,
                    id:nanoid()
                }
            ]
        })
    },
    {
        title: 'vxzvfq',
        data: [[3, 4], [5, 6], [7, 8]].map((e) => {
            const name1 = lorem.slice(e[0] * 5, e[0] * 5 + 10)
            const price1 = Math.floor(Math.random() * (500) + 100)
            const img1 = e[0]
            const category1 = lorem.slice(e[1] * 4, e[1] * 4 + 5)
            const star1 = Math.floor(Math.random() * (4) + 1)
            const name2 = lorem.slice(e[1] * 5, e[1] * 5 + 10)
            const price2 = Math.floor(Math.random() * (500) + 100)
            const img2 = e[1]
            const category2 = lorem.slice(e[1] * 4, e[1] * 4 + 5)
            const star2 = Math.floor(Math.random() * (4) + 1)
            return [
                {
                    name: name1,
                    price: price1,
                    img: img1,
                    category: category1,
                    star:star1,
                    id:nanoid()
                },
                {
                    name: name2,
                    price: price2,
                    img: img2,
                    category: category2,
                    star:star2,
                    id:nanoid()
                }
            ]
        })
    },
    {
        title: 'jytjrw',
        data: [[0, 1], [2, 3], [8, 9], [10, 11]].map((e) => {
            const name1 = lorem.slice(e[0] * 5, e[0] * 5 + 10)
            const price1 = Math.floor(Math.random() * (500) + 100)
            const img1 = e[0]
            const category1 = lorem.slice(e[1] * 4, e[1] * 4 + 5)
            const star1 = Math.floor(Math.random() * (4) + 1)
            const name2 = lorem.slice(e[1] * 5, e[1] * 5 + 10)
            const price2 = Math.floor(Math.random() * (500) + 100)
            const img2 = e[1]
            const category2 = lorem.slice(e[1] * 4, e[1] * 4 + 5)
            const star2 = Math.floor(Math.random() * (4) + 1)
            return [
                {
                    name: name1,
                    price: price1,
                    img: img1,
                    category: category1,
                    star:star1,
                    id:nanoid()
                },
                {
                    name: name2,
                    price: price2,
                    img: img2,
                    category: category2,
                    star:star2,
                    id:nanoid()
                }
            ]
        })
    },
    {
        title: 'afg52',
        data: [[0, 1], [2, 3], [8, 9], [10, 11]].map((e) => {
            const name1 = lorem.slice(e[0] * 5, e[0] * 5 + 10)
            const price1 = Math.floor(Math.random() * (500) + 100)
            const img1 = e[0]
            const category1 = lorem.slice(e[1] * 4, e[1] * 4 + 5)
            const star1 = Math.floor(Math.random() * (4) + 1)
            const name2 = lorem.slice(e[1] * 5, e[1] * 5 + 10)
            const price2 = Math.floor(Math.random() * (500) + 100)
            const img2 = e[1]
            const category2 = lorem.slice(e[1] * 4, e[1] * 4 + 5)
            const star2 = Math.floor(Math.random() * (4) + 1)
            return [
                {
                    name: name1,
                    price: price1,
                    img: img1,
                    category: category1,
                    star:star1,
                    id:nanoid()
                },
                {
                    name: name2,
                    price: price2,
                    img: img2,
                    category: category2,
                    star:star2,
                    id:nanoid()
                }
            ]
        })
    },
    {
        title: '4tzxg2',
        data: [[0, 1], [2, 3], [8, 9], [10, 11]].map((e) => {
            const name1 = lorem.slice(e[0] * 5, e[0] * 5 + 10)
            const price1 = Math.floor(Math.random() * (500) + 100)
            const img1 = e[0]
            const category1 = lorem.slice(e[1] * 4, e[1] * 4 + 5)
            const star1 = Math.floor(Math.random() * (4) + 1)
            const name2 = lorem.slice(e[1] * 5, e[1] * 5 + 10)
            const price2 = Math.floor(Math.random() * (500) + 100)
            const img2 = e[1]
            const category2 = lorem.slice(e[1] * 4, e[1] * 4 + 5)
            const star2 = Math.floor(Math.random() * (4) + 1)
            return [
                {
                    name: name1,
                    price: price1,
                    img: img1,
                    category: category1,
                    star:star1,
                    id:nanoid()
                },
                {
                    name: name2,
                    price: price2,
                    img: img2,
                    category: category2,
                    star:star2,
                    id:nanoid()
                }
            ]
        })
    }
]