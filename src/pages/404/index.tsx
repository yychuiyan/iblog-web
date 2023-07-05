const NotFound = () => {
  // 跳转到首页
  const handleJump = () => {
    window.location.href = 'https://yychuiyan.com/rblog/home'
  }
  return (
    <div>
      <div className='relative top-36 w-screen h-full'>
        <div className='relative m-auto w-[500px] h-[300px]'>
          <p className='flex items-end'>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2283" width="100" height="100"><path d="M956.973956 69.310575 67.147818 69.310575c-35.529191 0-64.420195 28.891004-64.420195 64.420195l0 612.263541c0 35.496445 28.922726 64.418148 64.420195 64.418148l48.402383 0c2.931772 9.046027 8.30106 17.997909 16.359596 26.363438 1.972934 2.038426 4.504594 3.51915 7.252171 4.257977 80.68974 20.898982 100.724029 46.889937 105.47524 60.502979 5.279237 15.09479-3.456728 27.224038-4.01136 27.964912-5.187139 6.698562-4.013407 16.299221 2.593058 21.547759 6.697539 5.339612 16.359596 4.226255 21.699208-2.503007 7.313569-9.259898 17.470907-31.515784 9.138124-56.456826-11.45182-34.138518-52.722782-60.994166-122.638131-79.762625-5.804193-6.910387-7.562233-12.592806-7.562233-17.223267 0-0.030699 0-0.062422 0-0.092098 0.029676-6.17156 3.919263-12.377912 10.926864-17.751293 0.215918-0.149403 0.462534-0.306992 0.648776-0.461511 2.004657-1.481747 4.257977-2.901073 6.729262-4.195555 0.585331-0.339738 1.171686-0.6191 1.75804-0.896416 2.963495-1.480724 6.356778-2.623757 9.721409-3.828188 5.373381-1.296529 15.066137-3.02387 30.466895-3.02387 27.010167 0 58.525951 5.309936 93.623307 15.649422 5.863545 2.561335 11.728112 5.217838 17.657148 8.365528 1.786693 0.957815 3.578502 1.977028 5.369288 3.02387 7.440459 4.168949 14.877849 8.736988 22.379707 13.890358 0.648776 0.464581 1.26583 0.772596 1.914606 1.234107 118.039393 82.880639 104.85614 124.706233 104.948237 124.706233l0 0c-3.980661 7.532557-1.109264 16.886599 6.42227 20.866237 2.282996 1.204431 4.752234 1.791809 7.191796 1.791809 5.555529 0 10.896164-2.994194 13.643742-8.242731 4.845355-9.166777 20.989033-55.405891-76.920904-135.755894L673.451624 810.383808c-97.942683 80.379679-81.827657 126.616746-76.982302 135.755894 2.838651 5.342682 8.426927 8.549723 14.169721 8.549723 2.311649 0 4.688789-0.554632 6.910387-1.728364 7.53358-3.982708 10.619872-12.901845 6.637164-20.433378-0.154519-0.402159-14.013155-42.22673 104.611569-125.509529 8.271384-5.803169 16.482393-10.804067 24.694425-15.371082 1.482771-0.831948 2.994194-1.696642 4.474918-2.499937 6.172583-3.270487 12.257162-6.048763 18.368346-8.703219 34.972513-10.278087 66.424852-15.588023 93.372597-15.588023 15.432481 0 25.096585 1.760087 30.40652 2.994194 3.393283 1.203408 6.884804 2.37714 9.815553 3.888564 0.586354 0.279363 1.109264 0.555655 1.667989 0.802272 2.591011 1.387603 5.031597 2.871397 7.096628 4.475941 0.096191 0.063445 0.189312 0.12382 0.278339 0.185218 7.070023 5.371334 10.957563 11.607362 10.989285 17.810644 0 0.092098 0.060375 0.154519 0.060375 0.246617-0.060375 4.569062-1.880837 10.217712-7.590885 17.068747-69.947072 18.768459-111.186312 45.624107-122.639155 79.762625-8.365528 24.941042 1.822508 47.196928 9.137101 56.456826 5.309936 6.729262 15.001669 7.81192 21.669532 2.503007 6.698562-5.28026 7.810896-14.969946 2.499937-21.669532-0.092098-0.124843-9.1678-12.223393-4.042059-27.473725 4.568039-13.70514 24.415063-39.850613 105.598037-60.901045 2.777253-0.710175 5.278213-2.191922 7.253194-4.261047 8.087189-8.395204 13.491269-17.408485 16.391319-26.514887 34.848693-0.774643 62.97017-29.231765 62.97017-64.267722L1021.270331 133.730771C1021.365498 98.201579 992.471424 69.310575 956.973956 69.310575L956.973956 69.310575zM166.606017 365.485065 303.966455 365.485065c5.8001 20.403702 15.71082 72.260767-7.532557 137.732921l-1.664919 4.568039c-11.266601 31.331589-25.281803 70.316485 5.862521 150.883429 19.045775 49.171909 7.314593 77.16752-0.678452 89.082898 0-0.031722-0.031722-0.031722-0.063445-0.031722-1.388627-0.553609-2.745531-1.047866-4.105504-1.572822-18.425651-6.945179-36.20662-11.326976-53.030797-13.612019-1.450025-0.187265-2.90005-0.402159-4.350075-0.586354-7.904017-0.895393-15.558347-1.388627-22.968108-1.420349-1.664919 0-3.270487 0.094144-4.938476 0.154519-6.142907 0.151449-12.098549 0.585331-17.777899 1.296529-1.515516 0.187265-3.059686 0.309038-4.541433 0.523933-1.203408 0.187265-2.314719 0.493234-3.486404 0.680499 5.370311-25.561166 9.014304-63.340607-7.80885-88.621387-18.026562-27.225061-22.225187-111.064538-0.310062-174.373423C185.990506 442.903296 174.630784 393.638265 166.606017 365.485065L166.606017 365.485065zM773.279237 658.669454c31.17707-80.627319 17.10047-119.614262 5.803169-150.97655l-1.603521-4.474918c-23.2444-65.500806-13.305027-117.328195-7.501858-137.732921l137.360438 0c-8.055466 28.1532-19.414165 77.417207-9.970072 104.703667 21.853727 63.37233 17.686824 147.240459-0.309038 174.342724-16.85283 25.310456-13.20986 63.060221-7.840572 88.652086-1.204431-0.246617-2.313695-0.523933-3.547803-0.680499-0.988514-0.154519-2.038426-0.214894-3.088338-0.369414-6.389524-0.864694-13.119809-1.327228-20.09671-1.481747-0.924045-0.028653-1.817392-0.092098-2.745531-0.092098-25.807782-0.124843-55.005778 5.001921-85.751013 17.192567C765.962597 735.90042 754.234485 707.870016 773.279237 658.669454L773.279237 658.669454zM990.496443 745.994312c0 18.056238-14.322194 32.780591-32.196283 33.492812-2.069125-5.929036-5.340635-11.670807-9.908674-17.010419-0.648776-0.709151-1.421372-1.38965-2.068102-2.070148-0.24457-0.275269-0.525979-0.493234-0.73985-0.738827-2.284019-2.347464-4.846378-4.569062-7.656377-6.699586-0.86367-0.678452-1.788739-1.355881-2.714831-2.004657-2.191922-1.545192-4.569062-2.995217-7.068999-4.383844-1.049912-0.618077-1.945305-1.328251-3.056616-1.911536-0.339738-0.187265-0.77055-0.280386-1.111311-0.465604-0.028653-0.027629-0.061398-0.027629-0.091074-0.062422-5.866614-19.755949-14.570857-62.352093-1.081635-82.539878 25.681916-38.736233 27.440979-132.883473 3.764744-201.535039-6.390547-18.491143 3.550873-63.957661 12.997012-94.610798l6.048763 0c8.521071 0 15.433504-6.913457 15.433504-15.432481 0-8.520047-6.912433-15.434527-15.433504-15.434527l-17.315364 0L758.894621 334.587358l-13.334703 0c-8.518001 0-15.434527 6.91448-15.434527 15.434527 0 5.989411 3.490497 11.018961 8.458649 13.580297-6.945179 27.504424-14.383592 81.801051 9.784854 149.892869l1.669012 4.66423c10.06217 27.872814 21.452591 59.480696-5.556553 129.302925-21.917172 56.579623-10.434653 93.466742 1.232061 113.222691-10.278087 5.435803-20.679995 11.667737-31.115672 18.768459l-0.028653 0.033769L359.559611 779.487124c-0.98749-0.680499-1.978051-1.14508-2.994194-1.823532-8.457626-5.680373-16.916275-10.774391-25.281803-15.310707-1.017166-0.554632-2.036379-1.234107-3.084245-1.790786 11.667737-19.786649 23.11751-56.641021 1.235131-113.130593-27.010167-69.697385-15.620769-101.278661-5.621021-129.179105l1.699712-4.724605c24.168446-68.095911 16.73208-122.360815 9.784854-149.863193 5.000897-2.563382 8.489348-7.592932 8.489348-13.58132 0-8.521071-6.915503-15.434527-15.434527-15.434527L315.048861 334.648756 145.644613 334.648756l-17.315364 0c-8.520047 0-15.434527 6.913457-15.434527 15.434527 0 8.520047 6.91448 15.434527 15.434527 15.434527l6.04774 0c9.416464 30.651091 19.384489 76.119655 12.997012 94.608751-23.303752 67.385736-21.512966 163.41279 3.76679 201.535039 13.365402 20.09671 4.723581 62.783928-1.111311 82.540901-0.370437 0.218988-0.86367 0.339738-1.234107 0.525979-1.235131 0.648776-2.221598 1.419326-3.364631 2.068102-2.314719 1.325182-4.536316 2.654456-6.606465 4.107551-1.019213 0.708128-2.006703 1.449002-2.994194 2.190899-2.685155 2.065032-5.15644 4.226255-7.375991 6.511297-0.309038 0.306992-0.648776 0.618077-0.958838 0.926092-0.645706 0.64673-1.418302 1.296529-2.00568 1.977028-1.883907 2.190899-3.365654 4.505617-4.846378 6.789637-0.028653 0.092098-0.092098 0.154519-0.154519 0.214894-2.036379 3.272533-3.764744 6.637164-4.967128 10.064216L67.118142 779.578198c-18.522865 0-33.555234-15.033391-33.555234-33.55421L33.562908 133.730771c0-18.489096 15.064091-33.553187 33.555234-33.553187l889.824091 0c18.489096 0 33.522488 15.064091 33.522488 33.553187l0 612.263541L990.496443 745.994312 990.496443 745.994312z" fill="#272536" p-id="2284"></path><path d="M479.387743 293.594735c0-8.519024-6.913457-15.434527-15.434527-15.434527-52.320623 0-96.6789-32.347732-118.005624-47.905056-4.9088-3.580548-8.766664-6.359848-11.42112-7.933693-7.349385-4.352121-16.792455-1.945305-21.145599 5.40101-4.352121 7.314593-1.946328 16.791431 5.372358 21.144576 2.067079 1.26583 5.122671 3.487428 9.012258 6.358825 23.953551 17.469883 73.80596 53.832046 136.187729 53.832046C472.474286 309.029262 479.387743 302.113759 479.387743 293.594735L479.387743 293.594735z" fill="#272536" p-id="2285"></path><path d="M700.554912 222.321458c-2.623757 1.573845-6.512321 4.353145-11.45182 7.933693-21.298072 15.525602-65.655326 47.876404-117.976972 47.876404-8.519024 0-15.431457 6.913457-15.431457 15.431457 0 8.519024 6.912433 15.435551 15.431457 15.435551 62.384839 0 112.235201-36.33351 136.189775-53.803393 3.888564-2.839675 6.945179-5.124717 9.04398-6.358825 7.315616-4.351098 9.722432-13.82896 5.371334-21.143553C717.347366 220.345454 707.871551 217.937614 700.554912 222.321458L700.554912 222.321458z" fill="#272536" p-id="2286"></path><path d="M622.244358 641.753179l-103.869672-46.610574c-4.26207-1.912559-9.138124-1.789763-13.30605 0.306992l-91.862197 46.611597c-7.622608 3.859911-10.648524 13.149485-6.789637 20.774139 3.825119 7.596002 13.117762 10.55745 20.741393 6.79066l85.286432-43.274596 97.111758 43.584658c2.038426 0.925069 4.229325 1.358951 6.329149 1.358951 5.865591 0 11.512195-3.364631 14.0766-9.106402C633.509936 654.408407 630.021485 645.272329 622.244358 641.753179L622.244358 641.753179z" fill="#272536" p-id="2287"></path></svg>
            <h1>404，页面找不到了......</h1>
          </p>
          <div className='absolute'>
            <p className='flex items-center justify-center mt-6 w-[500px] h-[50px] rounded-2xl bg-[#465893] text-[#fff] font-medium cursor-pointer' style={{ userSelect: 'none' }} onClick={handleJump}>
              返回首页
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
