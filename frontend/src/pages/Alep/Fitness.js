import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning } from "@fortawesome/free-solid-svg-icons";
// import wave from "../utils/wave2.png";
import wave from "../../utils/wave2.png";
import kudos2 from "../../utils/kudos.png";
import routeicon from "../../utils/routeicons.png";
import timeicon from "../../utils/timeicons.png";
import runicon from "../../utils/Run.png";
import LineChart from "../../components/Fitness/FitnessChart";


const authLink = "https://www.strava.com/oauth/token";

//const [athleteActivity,setathleteActivity]=useState("")

const clientID = 97652;

function initalAuth() {
  window.open(
    `https://www.strava.com/oauth/authorize?client_id=${clientID}&redirect_uri=http://localhost&response_type=code&scope=activity:read_all`
  );
}

function Fitness() {
  const [token, setToken] = useState("");
  const [athleteActivity, setathleteActivity] = useState([]);
  const [athleteFirstname, setathleteFirstname] = useState("");
  const [athleteLastName, setathleteLastName] = useState("");
  const [athleteFollowers, setathleteFollowers] = useState("");
  const [athleteId, setathleteId] = useState("");


  useEffect(() => {
    const reAuthorize = () => {
      fetch(authLink, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          client_id: "97652",
          client_secret: "70e445a71d44cd5cd8cb8cf55699ee321e44ca21",
          refresh_token: "e9bb7132ec616d6b67454f8aa56ae37ed4c845f3",
          grant_type: "refresh_token",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          getActivities(res);
          getLoggedInAthlete(res);
          setToken(res.access_token);
          getAthleteStats();
        })
        .catch((error) => {
          console.log("ERROR 404", error);
        });
    };
    reAuthorize();
  }, []);

  async function getLoggedInAthlete(res) {
    const getLoggedInAthlete = `https://www.strava.com/api/v3/athlete?access_token=${res.access_token}`;
    await axios.get(getLoggedInAthlete).then((res) => {
      //console.log(res.data)
      setathleteId(res.data.id);
      setathleteFirstname(res.data.firstname);
      setathleteLastName(res.data.lastname);
    });
  }

  async function getActivities(res) {
    const getActivityLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
    await axios.get(getActivityLink).then((res) => {
      //console.log(res.data);

      setathleteActivity(
        res.data.map((element) => {
          return {
            id: element.id,
            name: element.name,
            max_speed: element.max_speed,
            moving_time: element.moving_time,
            distance: element.distance,
            kudos: element.kudos_count,
          };
        })
      );
    });
  }

  const [athleteAllRunStats, setathleteAllRunStats] = useState({});
  const [athleteAllCycleStats, setathleteAllCycleStats] = useState({});
  const [athleteRecentRunStats, setathleteRecentRunStats] = useState({});
  const [athleteRecentCycleStats, setathleteRecentCycleStats] = useState({});
  //recent_ride_totals

  async function getAthleteStats() {
    await axios
      .get(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return (
          setathleteAllRunStats(res.data.all_run_totals),
          setathleteAllCycleStats(res.data.all_ride_totals),
          setathleteRecentRunStats(res.data.recent_run_totals),
          setathleteRecentCycleStats(res.data.recent_ride_totals)
        );
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  }
  getAthleteStats();
  //athleteRecentRunStats.count+athleteRecentCycleStats.count
  var weekActivityCount =
    Number(athleteRecentRunStats.count) + Number(athleteRecentCycleStats.count);
 

  var activityCount = athleteActivity.length;
  var Distance = athleteActivity.map((value) => {
    return value.distance;
  });

  let totalDistance = 0;
  for (let index = 0; index < Distance.length; index++) {
    totalDistance += Distance[index];
  }

  var excerciseTime = athleteActivity.map((value) => {
    return value.moving_time;
  });
  let totalExcerciseTime = 0;
  for (let index = 0; index < excerciseTime.length; index++) {
    totalExcerciseTime += excerciseTime[index];
  }
  var minutes = Math.round((totalExcerciseTime % 3600) / 60);
  totalExcerciseTime = Math.round(totalExcerciseTime / 3600);

  function getHours(time) {
    var hours = Math.round(time / 3600);
    return hours;
  }

  function getMin(time) {
    var minutes = Math.round((time % 3600) / 60);
    return minutes;
  }
  var kudos = athleteActivity.map((value) => {
    return value.kudos;
  });

  //console.log(minutes);
  let totalKudos = 0;
  for (let index = 0; index < kudos.length; index++) {
    totalKudos += kudos[index];
  }
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getWeekOfMonth(date) {
    let adjustedDate = date.getDate()+ date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7])+1);
}

  const date0 = new Date();
  date0.setDate(date0.getDate() - 6);
  let day0 = weekday[date0.getDay()];
  let time0 = date0.getTime();

  const date1 = new Date();
  date1.setDate(date1.getDate() - 5);
  let day1 = weekday[date1.getDay()];
  let time1 = date0.getTime();

  const date2 = new Date();
  date2.setDate(date2.getDate() - 4);
  let day2 = weekday[date2.getDay()];
  let time2 = date0.getTime();

  const date3 = new Date();
  date3.setDate(date3.getDate() - 3);
  let day3 = weekday[date3.getDay()];
  let time3 = date0.getTime();

  const date4 = new Date();
  date4.setDate(date4.getDate() - 2);
  let day4 = weekday[date4.getDay()];
  let time4 = date0.getTime();

  const date5 = new Date();
  date5.setDate(date5.getDate() - 1);
  let day5 = weekday[date5.getDay()];
  let time5 = date0.getTime();

  const date6 = new Date();
  // date6.setDate(date6.getDate());
  let time6 = date6.getTime();
  let day6 = "Today";
  

  async function getActivitiesChart() {
    await axios
      .get("https://www.strava.com/api/v3/athlete/activities", {
        params: {
          before: "1671374929025",
          after: "1671374929372",
          per_page: "30",
        },
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // let arr = [res.data];
        console.log(res.data);
        // return (activityPerDay[i] = arr.length);
      });
  }

  let epooch = [time0, time1, time2, time3, time4, time5, time6];
  let activityPerDay = [];
  for (let i = 0; i < epooch.length; i++) {
    //getActivitiesChart(i);
  }

  const data = {
    options: {
      scales: {
        y: { beginAtZero: true, min: 0, max: 10, ticks: { stepSize: 1 } },
      },
    },
    labels: ["Last 5 weeks", "Last 4 weeks", "Last 3 weeks", "Last 2 weeks", "Last weeks", "This week"],
    datasets: [
      {
        label: "Activities",
        data: [2, 1, 0, 1, 2, 3, 4],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      
      <button onClick={initalAuth}>Authorize</button>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y mt-5">
          <div class="row">
            <div class="col-lg-8 mb-4 order-0">
              <div class="card">
                <div class="d-flex align-items-end row">
                  <div class="col-sm-7">
                    <div class="card-body">
                      <h5 class="card-title text-primary">
                        Welcome {athleteFirstname}! 🎉
                      </h5>
                      <p class="mb-4">
                        You have done{" "}
                        <span class="fw-bold">{weekActivityCount}</span>{" "}
                        activities this week. Check your new badge in your
                        profile.
                      </p>
                      <a
                        href="/profile"
                        class="btn btn-sm btn-outline-primary"
                        
                      >
                        View Badges
                      </a>
                    </div>
                  </div>
                  <div class="col-sm-5 text-center text-sm-left">
                    <div class="card-body pb-0 px-0 px-md-4">
                      <img src={runicon} height={140} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 order-1">
              <div class="row">
                <div class="col-lg-6 col-md-12 col-6 mb-4">
                  <div class="card">
                    <div class="card-body">
                      <div class="card-title d-flex align-items-start justify-content-between">
                        <div class="avatar flex-shrink-0">
                          <img
                            src={wave}
                            height={40}
                            width={40}
                            class="rounded"
                          />
                        </div>
                        <div class="dropdown">
                          <button
                            class="btn p-0"
                            type="button"
                            id="cardOpt3"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div
                            class="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt3"
                          >
                            <a class="dropdown-item" href="javascript:void(0);">
                              View More
                            </a>
                            <a class="dropdown-item" href="javascript:void(0);">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>

                      <span class="fw-semibold d-block mb-1">Activities</span>
                      <h3 class="card-title mb-2">{activityCount}</h3>
                      <small class="text-success fw-semibold">
                        <i class="bx bx-up-arrow-alt"></i> +72.80%
                      </small>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-12 col-6 mb-4">
                  <div class="card">
                    <div class="card-body">
                      <div class="card-title d-flex align-items-start justify-content-between">
                        <div class="avatar flex-shrink-0">
                          <img
                            src={kudos2}
                            height={40}
                            width={40}
                            class="rounded"
                          />
                        </div>
                        <div class="dropdown">
                          <button
                            class="btn p-0"
                            type="button"
                            id="cardOpt6"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div
                            class="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt6"
                          >
                            <a class="dropdown-item" href="javascript:void(0);">
                              View More
                            </a>
                            <a class="dropdown-item" href="javascript:void(0);">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span class="fw-semibold d-block mb-1">Kudos</span>
                      <h3 class="card-title text-nowrap mb-1">{totalKudos}</h3>
                      <small class="text-success fw-semibold">
                        <i class="bx bx-up-arrow-alt"></i> +28.42%
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
              <div class="card h-100">
                <div class="row row-bordered g-0">
                  <h5 class="card-header m-0 me-2 pb-3 pt-3">
                    <FontAwesomeIcon icon={faRunning} /> This Month
                  </h5>
                  <div>
                    
                      <div className="fitnessChartJS">
                        <LineChart chartData={data} />
                      </div>
                    
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-8 col-lg-4 order-3 order-md-2">
              <div class="row">
                <div class="col-6 mb-4">
                  <div class="card">
                    <div class="card-body">
                      <div class="card-title d-flex align-items-start justify-content-between">
                        <div class="avatar flex-shrink-0">
                          <img
                            src={routeicon}
                            height={40}
                            width={40}
                            class="rounded"
                          />
                        </div>
                        <div class="dropdown">
                          <button
                            class="btn p-0"
                            type="button"
                            id="cardOpt4"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div
                            class="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt4"
                          >
                            <a class="dropdown-item" href="javascript:void(0);">
                              View More
                            </a>
                            <a class="dropdown-item" href="javascript:void(0);">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span class="fw-semibold d-block mb-1">Distance</span>
                      <h3 class="card-title text-nowrap mb-2">
                        {Math.round(totalDistance / 10) / 100} km
                      </h3>
                      <small class="text-danger fw-semibold">
                        <i class="bx bx-down-arrow-alt"></i> -14.82%
                      </small>
                    </div>
                  </div>
                </div>
                <div class="col-6 mb-4">
                  <div class="card">
                    <div class="card-body">
                      <div class="card-title d-flex align-items-start justify-content-between">
                        <div class="avatar flex-shrink-0">
                          <img
                            src={timeicon}
                            height={40}
                            width={40}
                            class="rounded"
                          />
                        </div>
                        <div class="dropdown">
                          <button
                            class="btn p-0"
                            type="button"
                            id="cardOpt1"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div class="dropdown-menu" aria-labelledby="cardOpt1">
                            <a class="dropdown-item" href="javascript:void(0);">
                              View More
                            </a>
                            <a class="dropdown-item" href="javascript:void(0);">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span class="fw-semibold d-block mb-1">
                        Exercise Time
                      </span>
                      <h3 class="card-title mb-2">
                        {totalExcerciseTime}h {minutes}m
                      </h3>
                      <small class="text-success fw-semibold">
                        <i class="bx bx-up-arrow-alt"></i> +28.14%
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mb-4">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between flex-sm-row flex-column">
                      <div class="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                        <div class="card-title">
                          <h5 class="text-nowrap mb-2">Profile</h5>

                          <div class="card_stats mt-3">
                            <ul class="list-group list-group-horizontal text-md-center">
                              <li class="list-group-item">
                                &nbsp;&nbsp;Followers&nbsp;&nbsp;&nbsp;{" "}
                                <h3 class="mb-0">10</h3>
                              </li>
                              <li class="list-group-item">
                                &nbsp;&nbsp; Following&nbsp;&nbsp;&nbsp;
                                <h3 class="mb-0">111</h3>
                              </li>
                              <li class="list-group-item">
                                &nbsp;&nbsp; Activities&nbsp;&nbsp;&nbsp;
                                <h3 class="mb-0">{activityCount}</h3>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="mt-sm-auto">
                          <small class="text-success text-nowrap fw-semibold">
                            <i class="bx bx-chevron-up"></i>Name
                          </small>
                          <h3 class="mb-0">
                            {athleteFirstname} {athleteLastName}
                          </h3>
                        </div>
                      </div>
                      <div id="profileReportChart"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
              <div class="card h-100">
                <div class="card-header d-flex align-items-center justify-content-between pb-0">
                  <div class="card-title mb-2">
                    <h5 class="m-0 me-2">Clubs</h5>
                    <small class="text-muted">UM Runners</small>
                  </div>
                  <div class="dropdown">
                    <button
                      class="btn p-0"
                      type="button"
                      id="orederStatistics"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div
                      class="dropdown-menu dropdown-menu-end"
                      aria-labelledby="orederStatistics"
                    >
                      <a class="dropdown-item" href="javascript:void(0);">
                        Select All
                      </a>
                      <a class="dropdown-item" href="javascript:void(0);">
                        Refresh
                      </a>
                      <a class="dropdown-item" href="javascript:void(0);">
                        Share
                      </a>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex flex-column align-items-center gap-1">
                      <h5 class="mb-2">Club Activities</h5>
                    </div>
                    <div id="orderStatisticsChart"></div>
                  </div>

                  <div class="table-responsive text-nowrap">
                    <table class="table card-table">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Athlete</th>
                          <th>Distance</th>
                        </tr>
                      </thead>
                      <tbody class="table-border-bottom-0">
                        <tr>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i>{" "}
                            <strong>1</strong>
                          </td>
                          <td>Albert Cook</td>
                          <td>188.9 km</td>
                        </tr>
                        <tr>
                          <td>
                            <i class="fab fa-react fa-lg text-info me-3"></i>{" "}
                            <strong>2</strong>
                          </td>
                          <td>Barry Hunter</td>
                          <td>182.1 km</td>
                        </tr>
                        <tr>
                          <td>
                            <i class="fab fa-vuejs fa-lg text-success me-3"></i>{" "}
                            <strong>3</strong>
                          </td>
                          <td>Trevor Baker</td>
                          <td>172.9 km</td>
                        </tr>
                        <tr>
                          <td>
                            <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>{" "}
                            <strong>4</strong>
                          </td>
                          <td>Jerry Milton</td>
                          <td>157.8 km</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4 order-1 mb-4">
              <div class="card h-100">
                <div class="card-header">
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">Running </h5>
                    <small class="text-muted">Run Stats</small>
                  </div>
                </div>

                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table card-table">
                      <thead class="table-active">
                        <tr>
                          <th>This Week</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody class="table-border-bottom-0">
                        <tr>
                          <td>
                            <h6>Avg Runs/Week</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {athleteRecentRunStats.count}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Avg Time/Week</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {getHours(athleteRecentRunStats.moving_time)}h{" "}
                            {getMin(athleteRecentRunStats.moving_time)}m
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Avg Distance/Week</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {athleteRecentRunStats.distance / 1000} km
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table card-table">
                      <thead class="table-active">
                        <tr>
                          <th>All-Time</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody class="table-border-bottom-0">
                        <tr>
                          <td>
                            <h6>Runs</h6>
                          </td>
                          <td></td>

                          <td class="text-end">{athleteAllRunStats.count}</td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Time</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {getHours(athleteAllRunStats.moving_time)}h{" "}
                            {getMin(athleteAllRunStats.moving_time)}m
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Distance</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {Math.round(athleteAllRunStats.distance / 10) / 100}{" "}
                            km
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Elevation Gain</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {athleteAllRunStats.elevation_gain}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4 order-2 mb-4">
              <div class="card h-100">
                <div class="card-header d-flex align-items-center justify-content-between">
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">Cycling</h5>
                    <small class="text-muted">Stats</small>
                  </div>
                </div>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table card-table">
                      <thead class="table-active">
                        <tr>
                          <th>This Week</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody class="table-border-bottom-0">
                        <tr>
                          <td>
                            <h6>Avg Rides/Week</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {athleteRecentCycleStats.count}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Avg Time/Week</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {getHours(athleteRecentCycleStats.moving_time)}h{" "}
                            {getMin(athleteRecentCycleStats.moving_time)}m
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Avg Distance/Week</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {Math.round(athleteRecentCycleStats.distance / 10) /
                              100}{" "}
                            km
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table card-table">
                      <thead class="table-active">
                        <tr>
                          <th>All-Time</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody class="table-border-bottom-0">
                        <tr>
                          <td>
                            <h6>Rides</h6>
                          </td>
                          <td></td>

                          <td class="text-end">{athleteAllCycleStats.count}</td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Time</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {getHours(athleteAllCycleStats.moving_time)}h{" "}
                            {getMin(athleteAllCycleStats.moving_time)}m
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Distance</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {Math.round(athleteAllCycleStats.distance / 10) /
                              100}{" "}
                            km
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Elevation Gain</h6>
                          </td>
                          <td></td>
                          <td class="text-end">
                            {athleteAllCycleStats.elevation_gain} m
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="content-footer footer bg-footer-theme">
        <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
          <div class="mb-2 mb-md-0">
            ©<script>document.write(new Date().getFullYear());</script>, made
            with ❤️ by
            <a
              href="https://themeselection.com"
              target="_blank"
              class="footer-link fw-bolder"
            >
              ThemeSelection
            </a>
          </div>
          <div>
            <a
              href="https://themeselection.com/license/"
              class="footer-link me-4"
              target="_blank"
            >
              License
            </a>
            <a
              href="https://themeselection.com/"
              target="_blank"
              class="footer-link me-4"
            >
              More Themes
            </a>
            <a
              href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
              target="_blank"
              class="footer-link me-4"
            >
              Documentation
            </a>
            <a
              href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
              target="_blank"
              class="footer-link me-4"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
      <div class="content-backdrop fade"></div>
    </div>
  );
}

export default Fitness;
