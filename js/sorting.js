

const partition = (arr, low, high, comparator) => {
    if (high <= low) return arr
    const mid = Math.floor((low + high) / 2)

    const pivot = arr[mid]

    let left = low
    let right = high

    while (true) {
        while (left <= high && arr[left] < pivot) { //
            left++
        }
        while (right >= low && arr[right] > pivot) {
            right--
        }

        /**
         * left <= high  and right >= low, ensures each pointer
         * scans the array within its respective bounds 
         *  ***/
        if (left >= right) {
            return right
        }

        [arr[left], arr[right]] = [arr[right], arr[left]] // at this point, element on left is greater than pivot and element on right is smaller than pivot

        left++
        right--
    }

}

const quickSort = (arr, comparator, low, high) => {
    if (!comparator)
        comparator = (a, b) => a - b

    const pivot = partition(arr, low, high, comparator)

    quickSort(arr, low, right - 1, comparator)
    quickSort(arr, right + 1, high, comparator)
}

const arr = [2, 3, 1, 4, 6, 5, 7, 8]

sort(arr)
console.log(arr);
