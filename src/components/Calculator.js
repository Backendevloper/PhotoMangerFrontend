import { useEffect, useState } from "react"
import Consts from "../consts.json"
import { FaChevronUp } from 'react-icons/fa'
import "../main.css"
import "./stylesheets/headings.css"
import "./stylesheets/my_animations.css"
import Cookies from "js-cookie"
import { fundCalendarsFromUserToken } from "./fetchers/fund_calendar"
import CalendarList from "./calendar/CalendarList"
import useParamsHelper from "../helpers/useParamsHelper"
import ShowCalendar from "./calendar/ShowCalendar"

const Calculator = () => {
  const [showCalendarform, setShowCalendarForm] = useState(false)
  const [formData, setFormData] = useState({})
  const [calculatedAmount, setCalculatedAmount] = useState(false)
  const [showCalculatedAmount, setShowCalculatedAmount] = useState(false)
  const [stepper, setStepper] = useState(1)
  const [showMonthsFunds, setShowMonthsFunds] = useState(false)
  const [fundCalendars, setFundCalendars] = useState(null)

  useEffect(() => {
    setFundCalendars(fundCalendarsFromUserToken(Cookies.get('session_token')))
  }, [])

  const calculateAmount = () => {
    if (!isFormFilled()) {
      return false
    }

    setMonthlysavingsInFormData((formData["goal"] / formData["timeInYears"])/12)

    let years = document.getElementById('yearlyInput')
    let goal =  document.getElementById('goal')

    if (years) {
      years.value = formData["goal"] / formData["timeInYears"]
    }

    setCalculatedAmount(formData["goal"] / formData["timeInYears"])

    if (showCalculatedAmount) {
      document.getElementById("monthlyInput").value = (formData["goal"] / formData["timeInYears"]) / 12
      document.getElementById("yearlyReturns").value = ((goal.value/100) * formData['yearlyReturns'])
      document.getElementById("monthlyReturns").value = ((goal.value/100) * formData['yearlyReturns']) / 12
    }

    setShowCalculatedAmount(true)
    return true
  }

  const calculateTotalAmount = () => {
    let sum = 0

    Array.from(Array(parseInt(formData['timeInYears']))).map((_, index) => {
      sum += parseFloat(formData[new Date().getFullYear() + index].reduce((x,y) => {
        return x + parseFloat(y)
      }, 0.0))
    })

    return sum.toFixed(2)
  }

  const isFormFilled = () => {
    if(!(formData["yearlyReturns"]) || !(formData["goal"]) || !(formData["timeInYears"])) {
      return false
    }

    return true
  }

  const goToSecondStep = () => {
    if (!calculateAmount()) {
      return
    }

    setStepper(2)
  }

  const setMonthlysavingsInFormData = (monthlySavings) => {
    Array.from(Array(parseInt(formData['timeInYears']))).map((_, i) => {
      if (i == 0) {
        let current_month = new Date().getUTCMonth()
        let updated_saving = monthlySavings + ((monthlySavings * current_month) / (12 - current_month) )
        let monthArray = Array(12 - current_month).fill(updated_saving)
        formData[new Date().getFullYear() + i] = monthArray
      } else {
        let monthArray = Array(12).fill(monthlySavings)
        formData[new Date().getFullYear() + i] = monthArray
      }
    })
  }

  const handleAmountChangeYearly = (event) => {
    let amount =       event.target.value
    let goal =         document.getElementById('goal')
    let years =        document.getElementById('years')
    let monthlyInput = document.getElementById('monthlyInput')

    setCalculatedAmount(amount*years.value)
    goal.value = amount*years.value
    setFormData({...formData, goal: goal.value})
    monthlyInput.value = amount/12
    document.getElementById('yearlyReturns').value  =  (goal.value/100) * formData['yearlyReturns']
    document.getElementById('monthlyReturns').value = ((goal.value/100) * formData['yearlyReturns'])/12
  }

  const handleAmountChangeMonthly = (event) => {
    let amount =      event.target.value
    let goal =        document.getElementById('goal')
    let years =       document.getElementById('years')
    let yearlyInput = document.getElementById('yearlyInput')

    setCalculatedAmount((amount*12)*years.value)
    goal.value = (amount*12)*years.value
    setFormData({...formData, goal: goal.value})
    yearlyInput.value = amount*12
    document.getElementById('yearlyReturns').value =  (goal.value/100) * formData['yearlyReturns']
    document.getElementById('monthlyReturns').value = ((goal.value/100) * formData['yearlyReturns'])/12
  }

  const handleYearlyReturnsChange = (event) => {
    let yearlyReturns = event.target.value
    let newPercentage = (yearlyReturns * 100)/formData["goal"]

    formData['yearlyReturns'] = newPercentage
    document.getElementById("yearlyReturnsPercentage").value = newPercentage
    document.getElementById('monthlyReturns').value = yearlyReturns/12
  }

  const handleMonthlyReturnsChange = (event) => {
    let monthlyReturns = event.target.value
    let newPercentage = ((monthlyReturns * 12) * 100)/formData["goal"]

    formData['yearlyReturns'] = newPercentage
    document.getElementById("yearlyReturnsPercentage").value = newPercentage
    document.getElementById('yearlyReturns').value = monthlyReturns * 12
  }

  const submitCalendar = async (event) => {
    let url = `${Consts.backend_base}/api/calendar?user_token=${Cookies.get('session_token')}`
    formData['goal'] = calculateTotalAmount()

    let response = await fetch(url, {
      method: 'post',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData)
    })

    let response_json = await response.json()

    if (response_json["response"] != 'success') {
      event.target.classList.add('error_pulse')
      setTimeout(() => {event.target.classList.remove('error_pulse')}, 650)
    } else {
      window.location.href = '/calculator'
    }
  }

  return(
    <div className="p-4">
      <div className="flex flex-wrap justify-between">
        <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">Funds Calculator</h1>

        <button className={`transition-all duration-200 ml-5 ${showCalendarform ? "bg-gray-200 text-white" : "text-gray-900 bg-white"} border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-1.5 py-1.5 me-1 mb-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
          onClick={() => {setShowCalendarForm(!showCalendarform)}}
        >
          New Calendar
        </button>
      </div>
      <hr />

      { useParamsHelper(1) ? // if calendar_id is present in params
        <ShowCalendar calendars={fundCalendars} />
      : null }

      { !useParamsHelper(1) && showCalendarform ?
        <div>
          <div className="m-5 flex justify-center">
            <button className="mr-4"><hr className={`w-32 h-2 ${stepper >= 1 ? "bg-blue-500 border-0 dark:bg-blue-700" : "bg-gray-200 border-0 dark:bg-gray-700"}`} onClick={() => {setStepper(1)}}/></button>
            <button className="mr-4"><hr className={`w-32 h-2 ${stepper >= 2 ? "bg-blue-500 border-0 dark:bg-blue-700" : "bg-gray-200 border-0 dark:bg-gray-700"}`} onClick={() => {setStepper(2)}}/></button>
            <button><hr className={`w-32 h-2 ${stepper >= 3 ? "bg-blue-500 border-0 dark:bg-blue-700" : "bg-gray-200 border-0 dark:bg-gray-700"}`} onClick={() => {setStepper(3)}}/></button>
          </div>

          {stepper == 1 &&
            <div>
              <div className="my-5 flex justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold">
                  Years of Savings
                </label>

                <input className="shadow appearance-none border rounded w-7/12 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="years"
                  value={formData["timeInYears"]}
                  type="number"
                  placeholder="40"
                  max="120"
                  onChange={(event) => {setFormData({...formData, timeInYears: (event.target.value > 120 ? 120 : event.target.value)})}}
                />
              </div>

              <div className="my-5 flex justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold">
                  Expected goal amount
                </label>

                <input className="shadow appearance-none border rounded w-7/12 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="goal"
                  value={formData["goal"]}
                  type="number"
                  placeholder="100000000"
                  onChange={(event) => {setFormData({...formData, goal: event.target.value})}}
                />
              </div>

              <div className="my-5 flex justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold">
                  Expected yearly returns from savings (in %)
                </label>

                <input className="shadow appearance-none border rounded w-7/12 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="yearlyReturnsPercentage"
                  value={formData["yearlyReturns"]}
                  type="number"
                  placeholder="4.75"
                  onChange={(event) => {setFormData({...formData, yearlyReturns: event.target.value})}}
                />
              </div>

              <div className="flex items-center justify-between mb-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={calculateAmount}
                >
                  Calculate
                </button>

                <button
                  className={`${isFormFilled() ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-100"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  onClick={goToSecondStep}
                >
                  Next
                </button>
              </div>

              {
                showCalculatedAmount ? 
                  <div>
                    <p> To save per year: <input id="yearlyInput" type="number" defaultValue={calculatedAmount} onChange={handleAmountChangeYearly}/></p>
                    <p> To save per Month: <input id="monthlyInput" type="number" defaultValue={calculatedAmount/12} onChange={handleAmountChangeMonthly}/></p>
                    <p> Yearly returns: <input id="yearlyReturns" type="number" defaultValue={(formData["goal"]/100)*formData["yearlyReturns"]} onChange={handleYearlyReturnsChange}/></p>
                    <p> Monthly returns: <input id="monthlyReturns" type="number" defaultValue={((formData["goal"]/100)*formData["yearlyReturns"])/12} onChange={handleMonthlyReturnsChange}/></p>
                  </div> : null
              }

              <hr />
            </div>
          }
          {stepper == 2 &&
            <div>
              {formData['timeInYears'] && Array.from(Array(parseInt(formData['timeInYears']))).map((_, index) =>{
              return(
                <div tabIndex="0" key={index} className={`bg-cyan-100 hover:bg-cyan-200 rounded-lg mb-5 mt-2 flex p-3`} style={{justifyContent: "space-between"}}
                  onClick={(event) => {
                    if (event.target.getAttribute('closeaction') || event.target.parentElement.getAttribute('closeaction') || event.target.parentElement.parentElement.getAttribute('closeaction') ) {
                      setShowMonthsFunds(false);
                      return;
                    }

                    setShowMonthsFunds(new Date().getFullYear() + index);
                  }}
                >
                  <div className="ml-5 clickable" style={{width: "100%"}}>
                    <div className="flex justify-between" style={{justifyContent: "space-between"}}>
                      <span>{new Date().getFullYear() + index}</span>

                      <span>
                        {parseFloat(formData[new Date().getFullYear() + index].reduce((x,y) => {
                          return x + parseFloat(y)
                        }, 0.0)).toFixed(2)}
                      </span>
                    </div>
                    {
                      showMonthsFunds == (new Date().getFullYear() + index) &&
                      <div>
                        <br />
                        {formData[new Date().getFullYear() + index].map((v, i) => {
                          if (i < new Date().getUTCMonth()) {
                            return
                          }

                          return(
                            <div key={i} className="flex justify-between">
                              <span>{Consts.months[i]}</span>

                              <input
                                className="m-3"
                                type="number"
                                defaultValue={parseFloat(v).toFixed(2)}
                                onChange={(event) => {
                                  formData[new Date().getFullYear() + index][i] = event.target.value
                                }}
                              />
                            </div>
                          )
                        })}

                        <button closeaction='true' className="hover:bg-cyan-300 p-2 rounded transition-all duration-200">
                          <FaChevronUp closeaction='true' />
                        </button>
                      </div>
                    }
                  </div>
                </div>
              )
              })}
                <button
                  className={`${isFormFilled() ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-100"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  onClick={() => {setStepper(3);}}
                >
                  Next
                </button>
            </div>
          }
          {stepper == 3 && 
            <div className="bg-indigo-200 heading-container-1" style={{marginTop: "3rem", width: "93%", minHeight: "20rem"}}>
              <h1 className="heading-1">Total Goal : { calculateTotalAmount() }</h1>
              <h1 className="heading-1">Total duration (in years) : { formData["timeInYears"] }</h1>

              <button className="heading-2 transition-all duration-200 ml-5 bg-indigo-400 border border-gray-300 focus:outline-none hover:bg-indigo-300 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-1.5 py-1.5 me-1 mb-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
               onClick={submitCalendar}
              >
                Confirm?
              </button>
            </div>
          }
        </div> : null
      }
      { !useParamsHelper(1) && !showCalendarform ? <CalendarList lists={fundCalendars} /> : null }
    </div>
  )
}

export default Calculator
