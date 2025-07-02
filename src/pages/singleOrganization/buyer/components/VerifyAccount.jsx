import React from 'react'
import { useDispatch } from 'react-redux'
import { updateVerifyAccount } from '../../../../redux/action/account'

function VerifyAccount({ id, setIsModalOpen,organizationName }) {
  const dispatch = useDispatch()

  const confirmVerifyAccount = () => {
    dispatch(updateVerifyAccount(id, setIsModalOpen))

  }
  return (
    <div>
      <h4 className="normal-size">Confirm to verify this <span className='green-text'>{organizationName}</span> account.</h4>

      <div className="flex justify-end gap-1 mt-1">
        <button className="green btn-small" onClick={() => confirmVerifyAccount()}>
          Yes
        </button>
        <button
          className="red btn-small modal-close"
          onClick={() => setIsModalOpen(false)}
        >
          No
        </button>
      </div>
    </div>
  )
}

export default VerifyAccount
