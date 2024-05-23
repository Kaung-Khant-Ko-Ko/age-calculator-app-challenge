$("#calculate-btn").click(function () {
  let input_day = Number($("#day-input").val());
  let input_month = Number($("#month-input").val());
  let input_year = Number($("#year-input").val());

  if (
    input_day === 0 ||
    input_month === 0 ||
    input_year === 0 ||
    validateDay(input_day, input_month, input_year) === false
  ) {
    let msg = "";
    $("#error-day").slideUp();
    if (input_day === 0) {
      msg = "This field is required";
    } else {
      msg = "Must be a valid day";
    }
    setTimeout(() => {
      $("#error-day").text(msg);
      $("#error-day").slideDown();
      $("#error-day").removeClass("user-input__error--hidden");
      $(".user-input__title").addClass("error-title");
      $(".user-input").addClass("error-input");
    }, 400);
  } else {
    $("#error-day").slideUp();
    $(".user-input__title").removeClass("error-title");
    $(".user-input").removeClass("error-input");
  }

  if (input_month === 0 || validateMonth(input_month) === false) {
    let msg = "";
    $("#error-month").slideUp();
    if (input_month === 0) {
      msg = "This field is required";
    } else {
      msg = "Must be a valid month";
    }
    setTimeout(() => {
      $("#error-month").text(msg);
      $("#error-month").slideDown();
      $("#error-month").removeClass("user-input__error--hidden");
      $(".user-input__title").addClass("error-title");
      $(".user-input").addClass("error-input");
    }, 400);
  } else {
    $("#error-month").slideUp();
    $(".user-input__title").removeClass("error-title");
    $(".user-input").removeClass("error-input");
  }

  if (input_year === 0 || validateYear(input_year) === false) {
    let msg = "";
    $("#error-year").slideUp();
    if (input_year === 0) {
      msg = "This field is required";
    } else {
      msg = "Must be in the past";
    }
    setTimeout(() => {
      $("#error-year").text(msg);
      $("#error-year").slideDown();
      $("#error-year").removeClass("user-input__error--hidden");
      $(".user-input__title").addClass("error-title");
      $(".user-input").addClass("error-input");
    }, 400);
  } else {
    $("#error-year").slideUp();
    $(".user-input__title").removeClass("error-title");
    $(".user-input").removeClass("error-input");
  }

  if (validate(input_day, input_month, input_year)) {
    result = calculate(input_day, input_month, input_year);
    $("#result-year").animate({
      width: "toggle",
      height: $(".result").height(),
    });
    $("#result-month").animate({
      width: "toggle",
      height: $(".result").height(),
    });
    $("#result-day").animate({
      width: "toggle",
      height: $(".result").height(),
    });

    setTimeout(() => {
      $("#result-year").text(result.year);
      $("#result-year").animate({ width: "toggle" });

      $("#result-month").text(result.month);
      $("#result-month").animate({ width: "toggle" });

      $("#result-day").text(result.day);
      $("#result-day").animate({ width: "toggle" });
    }, 400);
  }
});

function validateDay(day, month, year) {
  let months_w_30days = [4, 6, 9, 11];
  let leap_year = null;

  if (months_w_30days.includes(month)) {
    return day > 0 && day < 31;
  } else if (month === 2) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          leap_year = true;
        } else {
          leap_year = false;
        }
      } else {
        leap_year = true;
      }
    } else {
      leap_year = false;
    }

    if (leap_year) {
      return day > 0 && day < 30;
    } else {
      return day > 0 && day < 29;
    }
  } else {
    return day > 0 && day < 32;
  }
}

function validateMonth(month) {
  return month > 0 && month < 13;
}

function validateYear(year) {
  return year > 0 && year <= new Date().getFullYear();
}

function validate(day, month, year) {
  return (
    validateDay(day, month, year) && validateMonth(month) && validateYear(year)
  );
}

function calculate(day, month, year) {
  let now = new Date();
  let currentYear = now.getFullYear();
  let currentMonth = now.getMonth() + 1;
  let currentDate = now.getDate();

  let ageYear = null;
  let ageMonth = null;
  let ageDay = null;

  ageYear = currentYear - year;

  if (currentMonth >= month) {
    ageMonth = currentMonth - month;
  } else {
    ageMonth = 12 + (currentMonth - month);
    ageYear--;
  }

  if (currentDate >= day) {
    ageDay = currentDate - day;
  } else {
    ageDay = 30 + (currentDate - day);
    ageMonth--;
  }

  return { year: ageYear, month: ageMonth, day: ageDay };
}
