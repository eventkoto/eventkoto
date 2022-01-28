import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FireDBQueryEvents } from "../../libs/firebase/db_events";
import Sidebar from "../dashboard/sidebar";
import { parseDate, parseDateString } from "../../libs/parseDate";
import { CompLoading } from "../../components/Loading";
import { FireEventInteraction } from "../../libs/firebase/event_interact";
import { FireAuth } from "../../libs/firebase/auth";
import { CompSidebar } from "../../components/SideBar";
import { toPng } from "html-to-image";

function Certificate({ pageRef, name, program, startDate }) {
  return (
    <svg
      ref={pageRef}
      width="100%"
      height="100%"
      viewBox={`0 0 1080 720`}
      preserveAspectRatio="xMidYMid meet"
    >
      <foreignObject x={0} y={0} width={1080} height={720}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          className="h-full w-full bg-white"
        >
          <div class="pm-certificate-container h-full">
            <img
              src="/cert.jpg"
              width="100%"
              height="100%"
              className="absolute w-full h-full object-cover"
            />
            <div class="relative pm-certificate-border col-xs-12">
              <div class="row pm-certificate-header"></div>

              <div class="row pm-certificate-body h-full">
                <div class="pm-certificate-watermark-full"></div>
                <div class="pm-certificate-block h-full flex flex-col justify-center items-center">
                  <div class="col-xs-12 my-24">
                    <div class="pm-certificate-title cursive col-xs-12 text-center">
                      <h2>
                        CERTIFICATE <span class="cursive-2 mr-3">of</span>
                        COMPLETION
                      </h2>
                    </div>
                  </div>

                  <div class="col-xs-12">
                    <div class="row">
                      <div class="col-xs-2"></div>
                      <div class="pm-certificate-name margin-0 col-xs-8 text-center">
                        <div class="pm-certificate-text">
                          This Certifies That
                        </div>
                        <span class="pm-name-text bold large">{name}</span>
                      </div>
                      <div class="col-xs-2"></div>
                    </div>
                  </div>

                  <div class="col-xs-12">
                    <div class="row">
                      <div class="col-xs-2"></div>
                      <div class="pm-earned col-xs-8 text-center my-6">
                        <span class="pm-certificate-text padding-0 block">
                          Has attended the event namely
                        </span>
                        <span class="pm-name-text bold medium">{program}</span>
                        <span class="pm-certificate-text padding-0 block mt-3 w-full px-44">
                          That was conducted on {startDate}. This certificate
                          was generated on the website EventKoto to commemorate
                          the participation of the member.
                        </span>
                      </div>
                      <div class="col-xs-2"></div>
                      <div class="col-xs-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}

export function ViewEvent() {
  let params = useParams();

  const [acct, setAcct] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const [inte, setInt] = useState(false);
  const [pinte, setPInt] = useState(false);
  const [attn, setAttn] = useState(false);
  const [pattn, setPAttn] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [rat, setRat] = useState(0);
  const [urrat, setUrRat] = useState(0);

  const pageRef = useRef();

  async function fetchData() {
    let acct = await FireAuth.getUser();
    let doc = await FireDBQueryEvents.getOne(
      params.id,
      false,
      true,
      true,
      true
    );

    setFinished(
      doc.schedules[1] && Number(`${doc.schedules[1].seconds}000`) < Date.now()
    );
    const yourRate = doc.ratings_list.filter(
      (e) => e.user_id === acct.uid && e.event_id === doc.uid
    )[0];
    yourRate && setUrRat(yourRate);
    //console.log(doc)
    //console.log(doc)
    setData(doc);
    setAcct(acct);

    //console.log(await FireEventInteraction.check("Interesteds", {user_id : acct.uid, event_id : doc.uid}))

    setInt(
      await FireEventInteraction.check("Interesteds", {
        user_id: acct.uid,
        event_id: doc.uid,
      })
    );
    setAttn(
      await FireEventInteraction.check("Attendance", {
        user_id: acct.uid,
        event_id: doc.uid,
      })
    );
    setRat(
      await FireEventInteraction.check("Ratings", {
        user_id: acct.uid,
        event_id: doc.uid,
      })
    );

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function setAction(act) {
    switch (act) {
      case "int":
        setLoading(true);
        //console.log(acct, data)
        await FireEventInteraction.toggleInterested(
          FireEventInteraction.data.interested(
            acct.uid,
            acct,
            acct.name,
            data.uid,
            data,
            data.title
          )
        );
        fetchData();
        break;
      case "pint":
        setPInt(true);
        break;
      case "atn":
        setLoading(true);
        //console.log(acct, data)
        await FireEventInteraction.toggleAttendance(
          FireEventInteraction.data.attendance(
            acct.uid,
            acct,
            acct.name,
            data.uid,
            data,
            data.title
          )
        );
        fetchData();
        break;
      case "patn":
        setPAttn(true);
        break;
      case "cert":
        setLoading(true);
        setTimeout(() => {
          toPng(pageRef.current, {
            cacheBust: true,
            width: 1080 * 2,
            height: 720 * 2,
          })
            .then((dataUrl) => {
              const link = document.createElement("a");
              link.download = `EventKotoCertificate_(${data.title.replaceAll(" ","_")}).png`;
              link.href = dataUrl;
              link.click();
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }, 10);

        break;
      default:
        act = act.split("_")[1];
        await FireEventInteraction.rate(
          FireEventInteraction.data.rating(
            acct.uid,
            acct,
            acct.name,
            data.uid,
            data,
            data.title,
            act
          )
        );
        setLoading(true);
        fetchData();
        break;
    }
  }

  return (
    <div className="dashboard">
      <CompSidebar />
      {data.title && (
        <div className="dashboard-main w-full">
          <div className="relative w-10/12 mx-auto bg-white px-2 shadow-lg">
            <CompLoading enabled={loading} />
            <img
              src={data.splash_image}
              className="w-full h-[50vh] object-cover"
              alt="splash"
            />

            <div className="flex mt-4">
              {isFinished ? (
                <>
                  <div className="flex-1 text-red-500 text-xl text-center">
                    <p className="">
                      {data.ratings > 0
                        ? [...new Array(Math.ceil(data.ratings))].map(
                            (e) => "⭐"
                          )
                        : "--No Ratings Yet--"}{" "}
                      {data.ratings > 0 && `(${data.ratings_list.length})`}
                    </p>
                  </div>
                  <div className="flex-1 text-red-500 text-3xl text-center">
                    <p className="">✋ {data.attendance_count}</p>
                  </div>
                </>
              ) : (
                <div className="flex-1 text-red-500 text-3xl text-center">
                  <p className="">♥ {data.interested_count}</p>
                </div>
              )}
            </div>
            <h1 className="text-6xl font-bold mt-5 text-center">
              {data.title}
            </h1>
            <h2 className="text-2xl text-red-600 text-center">
              by {data.organization}
            </h2>

            <div className="flex my-4 items-center">
              <div className="flex-1 flex flex-col text-center px-5 gap-1 justify-center">
                {isFinished ? (
                  <>
                    <button
                      onClick={setAction.bind(this, "patn")}
                      className={`p-2 ${
                        attn
                          ? "bg-blue-500 text-white"
                          : "border border-blue-500 text-blue-500"
                      } rounded-lg mr-2 w-full`}
                    >
                      {attn ? "I Attended Here!" : "Attended?"}
                    </button>
                    {attn && (
                      <>
                        <button
                          className="p-2 bg-green-400 rounded-lg w-full"
                          onClick={setAction.bind(this, "cert")}
                        >
                          Download Certificate of Attendance
                        </button>
                        <div className="m-2 border w-fit mx-auto">
                          <button
                            onClick={setAction.bind(this, "s_1")}
                            className="mr-2"
                          >
                            {urrat.ratings >= 1 ? "🌟" : "⭐"}
                          </button>
                          <button
                            onClick={setAction.bind(this, "s_2")}
                            className="mr-2"
                          >
                            {urrat.ratings >= 2 ? "🌟" : "⭐"}
                          </button>
                          <button
                            onClick={setAction.bind(this, "s_3")}
                            className="mr-2"
                          >
                            {urrat.ratings >= 3 ? "🌟" : "⭐"}
                          </button>
                          <button
                            onClick={setAction.bind(this, "s_4")}
                            className="mr-2"
                          >
                            {urrat.ratings >= 4 ? "🌟" : "⭐"}
                          </button>
                          <button
                            onClick={setAction.bind(this, "s_5")}
                            className="mr-2"
                          >
                            {urrat.ratings >= 5 ? "🌟" : "⭐"}
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <button
                    onClick={setAction.bind(this, "pint")}
                    className={`p-2 ${
                      inte
                        ? "bg-blue-500 text-white"
                        : "border border-blue-500 text-blue-500"
                    } rounded-lg mr-2`}
                  >
                    {inte ? "I'm Interested!" : "Interested?"}
                  </button>
                )}
              </div>
              <div className="flex-1 text-center">
                <strong>Starts On:</strong>{" "}
                {parseDate(Number(`${data.schedules[0].seconds}000`))}
              </div>
              {data.schedules[1] && (
                <div className="flex-1 text-center">
                  <strong>Ends On:</strong>{" "}
                  {parseDate(Number(`${data.schedules[1].seconds}000`))}
                </div>
              )}
            </div>

            <div className="ql-snow">
              <div
                className="ql-editor text-xl  pl-0 text-center mx-10"
                dangerouslySetInnerHTML={{ __html: data.overview }}
              ></div>

              <div className="border-b-2 border-red-900 my-4"></div>

              <div
                className="ql-editor text-xl pl-0 mt-4 text-center mx-10"
                dangerouslySetInnerHTML={{ __html: data.details }}
              ></div>

              <div className="border-b-2 border-red-900 my-4"></div>

              <img
                src={data.splash_image}
                className="w-full p-5 object-cover"
                alt="splash"
              />
              <div className="flex flex-wrap justify-center">
                {data.event_images &&
                  data.event_images.map((e, i) => (
                    <img
                      key={`evim_${i}`}
                      src={e}
                      className="w-1/2 p-5"
                      alt="splash"
                    />
                  ))}
              </div>

              <div className="pb-40"></div>
            </div>
          </div>

          <div className="absolute" style={{ width: 1080 }}>
            <Certificate
              pageRef={pageRef}
              name={acct.name}
              program={data.title.toUpperCase()}
              startDate={parseDateString(
                Number(
                  `${
                    (data.schedules[1] && data.schedules[1].seconds) ||
                    (data.schedules[0] && data.schedules[0].seconds)
                  }000`
                )
              )}
            />
          </div>

          {(pinte || pattn) && (
            <div
              className="fixed top-0 left-0 right-0 bottom-0 bg-gray w-full h-full bg-gray-500 bg-opacity-75 z-20 flex justify-center items-center"
              onClick={() => setPInt(false) || setPAttn(false)}
            >
              <div className="w-1/2 h-fit bg-white text-black flex rounded-lg overflow-hidden">
                <div className="w-1/3">
                  <img
                    src={data.splash_image}
                    className="w-full h-full object-cover"
                    alt="splash2"
                  />
                </div>
                <div className="flex-1 p-5">
                  {pinte && (
                    <>
                      <h2 className="text-xl">
                        Are You Interested In Attending This Event?
                      </h2>
                      <h1 className="text-2xl font-bold mt-5">{data.title}</h1>
                      <h2 className="text-xl text-red-600">
                        by {data.organization}
                      </h2>

                      <div className="my-6">
                        <p className="text-sm">You'll be attending as:</p>
                        <p className="font-bold">{acct.name}</p>
                        <p>{acct.program}</p>
                      </div>

                      <button
                        onClick={setAction.bind(this, "int")}
                        className={`p-2 ${
                          inte
                            ? "bg-blue-500 text-white"
                            : "border border-blue-500 text-blue-500"
                        } rounded-lg mr-2`}
                      >
                        {inte ? "I'm Interested!" : "Interested?"}
                      </button>
                      <p className="">
                        {data.interested_count} People Are Also Interested In
                        This Program
                      </p>
                    </>
                  )}
                  {pattn && (
                    <>
                      <h2 className="text-xl">Did You Attend This Event?</h2>
                      <h1 className="text-2xl font-bold mt-5">{data.title}</h1>
                      <h2 className="text-xl text-red-600">
                        by {data.organization}
                      </h2>

                      <div className="my-6">
                        <p className="text-sm">You attended as:</p>
                        <p className="font-bold">{acct.name}</p>
                        <p>{acct.program}</p>
                      </div>

                      <button
                        onClick={setAction.bind(this, "atn")}
                        className={`p-2 ${
                          attn
                            ? "bg-blue-500 text-white"
                            : "border border-blue-500 text-blue-500"
                        } rounded-lg mr-2`}
                      >
                        {attn ? "I Attended Here!" : "Attended?"}
                      </button>
                      <p className="">
                        {data.interested_count} People Are Also Interested In
                        This Program
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
