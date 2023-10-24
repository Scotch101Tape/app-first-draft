export default function Requires({requisite, fail, success}) {
  const [isSuccess, data] = requisite()
  if (isSuccess) {
    return success(data)
  } else {
    return fail()
  }
}
