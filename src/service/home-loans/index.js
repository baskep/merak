export const submitCommercialLoans = async (formData) => {
  try {
    const res = await fetch('/api/home-loans/commercial-loans', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

export const submitSyndicatedLoans = async (formData) => {
  try {
    const res = await fetch('/api/home-loans/syndicated-loans', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

export const submitRepayLoans = async (formData) => {
  try {
    const res = await fetch('/api/home-loans/repay-loans', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
}