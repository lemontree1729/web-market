import { useState, useRef } from "react"
import AddressInput from "../../component/address/AddressInput"
import AuthTimer from "../../component/phonenumber/AuthTimer"
import { useRouter } from "next/router"
import customAxios from "../../utils/customAxios"
import signupStyle from "../../styles/signup/signup.module.css"
import { NextPage } from "next"
import Link from "next/link"


const SignUp: NextPage = () => {
  const [Id, setId] = useState("")
  const [WrongId, setWrongId] = useState("")
  const [idCheckApi, setidCheckApi] = useState(false)
  const [Password, setPassword] = useState("")
  const [PasswordCheck, setPasswordCheck] = useState("")
  const [WrongPassword, setwrongPassword] = useState("")
  const [WrongPasswordCheck, setwrongPasswordCheck] = useState("")
  const [passwordConfirm, setpasswordConfirm] = useState(false)
  const [Name, setName] = useState("")
  const [WrongName, setwrongName] = useState("")
  const [Gender, setGender] = useState("")
  const [Email, setEmail] = useState("")
  const [WrongEmail, setwrongEmail] = useState("")
  const [PhoneNumber, setPhoneNumber] = useState("")
  const [WrongPhoneNumber, setwrongPhoneNumber] = useState("")
  const [Zonecode, setZonecode] = useState(''); // 우편번호
  const [Address, setAddress] = useState(''); // 주소
  const [AddressDetail, setAddressDetail] = useState(''); // 상세주소
  const [Authnumber, setAuthnumber] = useState("")
  const [serverAuthNumber, setserverAuthNumber] = useState(Number)
  const [ValidationAuthNumber, setValidationAuthNumber] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()


  const checkNum = /[0-9]/
  const checkLowerEng = /[a-z]/
  const checkUpperEng = /[A-Z]/
  const checkSpc = /[~!@#$%^&*()_+|<>?:{}]/
  const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  const checkBlank = /\s/



  async function accountRegister(event: any) {
    event.preventDefault()
    if (idCheckApi === false ||
      passwordConfirm === false ||
      validationName(Name) === false ||
      validationGender(Gender) === false ||
      validationEmail(Email) === false ||
      ValidationAuthNumber === false ||
      validatrionAddress(AddressDetail) === false) {

      alert('다시 입력해주세요.')
    } else {
      const data = {
        "id": Id,
        "password": Password,
        "name": Name,
        "email": Email,
        "gender": Gender,
        "phonenumber": PhoneNumber,
        "fulladdress": {
          "zonecode": Zonecode,
          "address": Address,
          "addressdetail": AddressDetail
        }, "authnumber": Authnumber
      }
      try {
        const res = await customAxios.post('/api/user', data)
        if (res.status == 200) {
          //로그인 성공
          router.replace('/')
          alert('회원가입 되었습니다.')
        } else {
          alert('회원가입에 실패했습니다.')
        }
      } catch (err) {
        console.log(err)
        alert('회원가입에 실패했습니다.') //로그인 실패
      }
    }
  }
  async function idCheckFunction(event: any) {
    event.preventDefault()
    if (validationId(Id)) {
      try {
        const res = await customAxios.get(`/api/user`, { params: { id: Id } })
        const { result } = res.data
        console.log(res.data)
        if (result) {
          if (result.length === 0) {
            alert('사용할 수 있는 아이디 입니다.')
            setidCheckApi(true)
          } else {
            alert("이미 존재하는 아이디 입니다.")
            setidCheckApi(false)
          }
        } else {
          alert('아이디 검색 실패')
        }
      } catch (err) {
        alert("아이디 확인 실패")
        console.log(err)
      }
    } else {
      alert("아이디를 다시 입력해주세요")
    }
  }
  async function sendNumberApi() { //인증번호 API
    try {
      const request = await customAxios.post('/api/user/naverAuth', { "phonenumber": PhoneNumber })
      if (request.status === 200) {
        setserverAuthNumber(request.data.result)
        console.log(request.data.result)
        alert('인증번호를 전송하였습니다.')
      }
    } catch (err) {
      alert("인증번호를 전송에 실패했습니다.")
      console.log(err)

    }
  }

  //아이디
  const IdInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => { //아이디 입력 핸들러
    const idValue = event.currentTarget.value
    console.log("id :" + validationId(idValue))
    if (validationId(idValue)) {
      setId(idValue)
    }
  }
  const validationId = (value: string) => {//아이디 유효성 판별
    if (value === "") {
      setWrongId("필수 정보입니다.")
      return false
    }
    else if (value.length < 5 || value.length > 20 || checkKor.test(value) || checkSpc.test(value)) {
      setWrongId("5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.")
      return false
    } else {
      setWrongId("")
      return true
    }
  }

  //패스워드
  const PasswordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => { //패스워드 입력 핸들러
    const passwordValue = event.currentTarget.value
    console.log("password :" + validationPassword(passwordValue))
    if (validationPassword(passwordValue)) {
      setPassword(passwordValue)
    }
  }
  const PasswordCheckInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {//패스워드 입력 확인 핸들러
    const passwordValueCheck = event.currentTarget.value
    console.log("passwordCheck :" + validationPasswordCheck(passwordValueCheck))
    if (passwordConfirm) {
      setPasswordCheck(passwordValueCheck)
    }
  }
  const validationPassword = (value: string) => {//패스워드 유효성 판별
    if (value === "") {
      setwrongPassword("필수 정보입니다.")
      return false
    } else if (value.length < 8 || value.length > 16 || !(checkLowerEng.test(value)) || !(checkUpperEng.test(value))) {
      setwrongPassword("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
      return false
    } else {
      setwrongPassword("")
      return true
    }
  }
  const validationPasswordCheck = (value: string) => {//패스워드 일치 판별
    if (value !== Password) {
      setwrongPasswordCheck("비밀번호가 일치하지 않습니다.")
      setpasswordConfirm(false)
    } else {
      setwrongPasswordCheck("패스워드가 일치합니다.")
      setpasswordConfirm(true)
    }
  }

  //이름
  const NameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => { //이름 입력 핸들러
    const nameValue = event.currentTarget.value
    console.log("name :" + validationName(nameValue))
    if (validationName(nameValue)) {
      setName(nameValue)
    }
  }
  const validationName = (value: string) => { //이름 유효성 판별
    if (value === "") {
      setwrongName("필수 정보입니다.")
      return false
    } else if (checkSpc.test(value) || checkBlank.test(value)) {
      setwrongName("한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)")
      return false
    } else {
      setwrongName("")
      return true
    }
  }
  //성별
  const GenderInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {//성별 입력 핸들러
    const genderValue = event.target.value
    console.log("gender :" + validationGender(genderValue))
    if (validationGender(genderValue)) {
      setGender(genderValue)
      console.log(typeof Gender)
    }
  }
  const validationGender = (value: string) => {//성별 유효성 판별
    if (value === "") {
      return false
    } else
      return true

  }

  //이메일
  const EmailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {//이메일 입력 핸들러
    const emailValue = event.currentTarget.value
    if (validationEmail(emailValue)) {
      setEmail(emailValue)
    }
  }
  const validationEmail = (value: string) => {//이메일 유효성 판별
    if (value === "") {
      setwrongEmail("필수 정보입니다.")
      return false
    } else if (value.indexOf('@') < 1 || value.indexOf('.com') < 1) {
      setwrongEmail("이메일 주소를 다시 확인해주세요")
      return false
    } else {
      setwrongEmail("")
      return true
    }

  }
  //전화번호
  const PhoneNumberInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {//폰번호 입력 핸들러
    const phoneNumberValue = event.currentTarget.value
    if (validationPhoneNumber(phoneNumberValue)) {
      setPhoneNumber(phoneNumberValue)
    }
  }
  const validationPhoneNumber = (value: string) => {//폰 번호 유효성 판별
    if (value === "") {
      setwrongPhoneNumber("필수 정보입니다.")
      return false
    } else if (!checkNum.test(value)) {
      setwrongPhoneNumber("번호를 다시 확인해주세요")
      return false
    } else {
      setwrongPhoneNumber("")
      return true
    }

  }
  //번호인증
  const openCetificationValue = useRef(false)
  const openCetification = (boolean: boolean) => {//인증창 열기
    openCetificationValue.current = boolean
    setIsOpen(boolean)
  }

  const certificationPhoneNumber = (event: any) => {//인증번호 api 보내기
    event.preventDefault()
    if (!validationPhoneNumber(PhoneNumber)) {
      alert("번호를 다시 입력해주세요")
    } else {
      openCetification(true)
      sendNumberApi()
    }
  }
  const AuthnumberInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {//인증번호 입력
    setAuthnumber(event.currentTarget.value)
    console.log(event.currentTarget.value)

  }
  const validationAuthnumber = (event: any) => {//인증번호 확인
    event.preventDefault()
    if (parseInt(Authnumber) === serverAuthNumber) {
      alert("인증번호가 일치합니다.")
      setValidationAuthNumber(true)
    } else {
      alert("인증번호가 일치하지 않습니다.")
      setValidationAuthNumber(true)
    }
  }
  //주소
  const addressValue = useRef(null)
  const setAddressFunction = (value: any) => {
    addressValue.current = value
    console.log("address :" + validatrionAddress(value))
    if (validatrionAddress(value)) {
      setAddress(value)
    }
  }
  const zonecodeValue = useRef(null)
  const setZonecodeFunction = (value: any) => {
    zonecodeValue.current = value
    console.log("zonecode :" + validatrionAddress(value))
    if (validatrionAddress(value)) {
      setZonecode(value)
    }

  }

  const addressDetailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const addressDetailValue = event.currentTarget.value
    if (validatrionAddress(addressDetailValue)) {
      setAddressDetail(addressDetailValue)
      // props.setaddressDetailFunction(addressDetailValue)
    }
  }

  //주소 유효성 판별
  const validatrionAddress = (value: string) => {
    if (value !== "") {
      return true
    } else
      return false

  }

  return (

    <form>
      <div className={signupStyle.container}>
        <div className={signupStyle.content}>
          <Link href="/" passHref>
            <div className={signupStyle.logo}></div>
          </Link>
          <div className={signupStyle.idform}>
            <label className={signupStyle.label}>
              아이디
              <div className={signupStyle.idInput}>
                <input className={signupStyle.input} type="text" defaultValue={Id} onChange={IdInputHandler} placeholder="아이디를 입력해주세요" />
                <button className={signupStyle.button} onClick={idCheckFunction}>아이디 확인</button>
              </div>
            </label>
            <p className={signupStyle.validation}>{WrongId}</p>
          </div>
          <div className={signupStyle.passwordform}>
            <label className={signupStyle.label}>
              패스워드

              <input className={signupStyle.input} type="password" defaultValue={Password} onChange={PasswordInputHandler} placeholder='비밀번호를 입력해주세요' />
            </label>
            <p className={signupStyle.validation}>{WrongPassword}</p>
            <label className={signupStyle.label}>
              패스워드 확인
              <input className={signupStyle.input} type="password" defaultValue={PasswordCheck} onChange={PasswordCheckInputHandler} placeholder='비밀번호를 다시 입력해주세요' />
            </label>
            <p className={passwordConfirm ? signupStyle.validationConfirm : signupStyle.validation}>{WrongPasswordCheck}</p>
          </div>
          <div className={signupStyle.nameform}>
            <label className={signupStyle.label}>
              이름
              <input className={signupStyle.input} type="text" defaultValue={Name} onChange={NameInputHandler} placeholder="이름을 입력해주세요" />
            </label>
            <p className={signupStyle.validation}>{WrongName}</p>
          </div>
          <div className={signupStyle.genderform}>
            <label className={signupStyle.label}>
              성별
              <div>
                남성
                <input type="radio" defaultValue="male" checked={Gender === "male"} onChange={GenderInputHandler} />
                여성
                <input type="radio" defaultValue="female" checked={Gender === "female"} onChange={GenderInputHandler} />
              </div>
            </label>
          </div>
          <div className={signupStyle.emailform}>
            <label className={signupStyle.label}>
              이메일
              <input className={signupStyle.input} type="email" defaultValue={Email} onChange={EmailInputHandler} placeholder='이메일을 입력해주세요' />
            </label>
            <p className={signupStyle.validation}>{WrongEmail}</p>
          </div>
          <div className={signupStyle.phoneform}>
            <label className={signupStyle.label}>
              전화번호
            </label>
            <div className={signupStyle.phoneInput}>
              <input className={signupStyle.input} type="text" defaultValue={PhoneNumber} onChange={PhoneNumberInputHandler} placeholder='전화번호를 입력해주세요' />
              <button className={signupStyle.button} onClick={certificationPhoneNumber}>인증번호 받기</button>
            </div>
            <div className={signupStyle.validation}>{WrongPhoneNumber}</div>

            {isOpen ?
              <div>
                <input className={signupStyle.input} type="text" defaultValue={Authnumber} onChange={AuthnumberInputHandler} />
                <AuthTimer
                  openCetification={openCetification}
                  ValidationAuthNumber={ValidationAuthNumber}
                />
                <button onClick={validationAuthnumber}>인증번호 확인</button>
              </div> : ""}
          </div>
          <div className={signupStyle.addressform}>
            <label>
              주소
            </label>
            <AddressInput
              setAddressFunction={setAddressFunction}
              setZonecodeFunction={setZonecodeFunction}
            />
            <input className={signupStyle.input} type="text" id="addressDetail" defaultValue={AddressDetail} onChange={addressDetailInputHandler} placeholder="상세주소" />
          </div>
          <div className={signupStyle.btn_signup}>
            <button type="submit" onClick={accountRegister}>가입</button>
          </div>
        </div>
      </div>
    </form >

  )
}

export default SignUp

