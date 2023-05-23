function test(A) {
    A()
}

test(function() {
    console.log('A')
})

console.log("")