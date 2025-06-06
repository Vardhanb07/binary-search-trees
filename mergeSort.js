function merge(a, low, mid, high){
    let t = []
    let left = low, right = mid + 1
    while(left <= mid && right <= high){
        if(a[left] <= a[right]){
            t.push(a[left])
            left++
        }else {
            t.push(a[right])
            right++
        }
    }
    while(left <= mid){
        t.push(a[left])
        left++
    }
    while(right <= high){
        t.push(a[right])
        right++
    }
    for(let i = low; i <= high; i++){
        a[i] = t[i - low]
    }
}
function divide(a,low, high){
    if(low >= high){
        return
    }
    let mid = parseInt((low + high)/2)
    divide(a, low, mid)
    divide(a, mid + 1, high)
    merge(a, low, mid, high)
}
export function mergeSort(a){
    divide(a, 0, a.length - 1)
    return a
}