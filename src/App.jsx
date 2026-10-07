import { useEffect, useState } from 'react';
import './App.css';

const INPUT_WEBHOOK_URL =
  'https://hddoy2021.app.n8n.cloud/webhook/store_input';

const DASHBOARD_URL =
  'https://hddoy2021.app.n8n.cloud/webhook/dashboard-data';


const initialForm = {
  store_id: 'DG001',
  business_date: '',
  consults: '',

  galaxy_s26_sales: '',
  galaxy_s26_ultra_sales: '',
  iphone18_pro_sales: '',
  flip8_sales: '',

  promotion_hq: '',
  promotion_store: '',

  no_purchase_price: '',
  no_purchase_benefit: '',
  no_purchase_service: '',
};


function App() {

  const [page, setPage] =
    useState('input');


  return (
    <div className="app">

      {/* ==============================
          HEADER
      ============================== */}

      <header className="header">

        <div className="header-inner">

          <div className="brand">

            <div className="team">
              18조
            </div>

            <div>
              <h1>우선픽</h1>

              <p>
                AI 대리점 실적·운영 분석 Agent
              </p>
            </div>

          </div>


          <nav className="nav">

            <button
              className={
                page === 'input'
                  ? 'nav-button active'
                  : 'nav-button'
              }
              onClick={() =>
                setPage('input')
              }
            >
              매장 실적 입력
            </button>


            <button
              className={
                page === 'dashboard'
                  ? 'nav-button active'
                  : 'nav-button'
              }
              onClick={() =>
                setPage('dashboard')
              }
            >
              관리자 대시보드
            </button>

          </nav>

        </div>

      </header>


      {/* ==============================
          PAGE
      ============================== */}

      {page === 'input'
        ? <InputPage />
        : <DashboardPage />
      }

    </div>
  );
}


// =====================================================
// INPUT PAGE
// =====================================================

function InputPage() {

  const [formData, setFormData] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [messageType, setMessageType] =
    useState('');


  function handleChange(e) {

    const {
      name,
      value
    } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  }


  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);

    setMessage('');

    setMessageType('');


    const payload = {

      ...formData,

      consults:
        Number(
          formData.consults || 0
        ),

      galaxy_s26_sales:
        Number(
          formData.galaxy_s26_sales || 0
        ),

      galaxy_s26_ultra_sales:
        Number(
          formData.galaxy_s26_ultra_sales || 0
        ),

      iphone18_pro_sales:
        Number(
          formData.iphone18_pro_sales || 0
        ),

      flip8_sales:
        Number(
          formData.flip8_sales || 0
        ),

      no_purchase_price:
        Number(
          formData.no_purchase_price || 0
        ),

      no_purchase_benefit:
        Number(
          formData.no_purchase_benefit || 0
        ),

      no_purchase_service:
        Number(
          formData.no_purchase_service || 0
        )

    };


    try {

      const response =
        await fetch(
          INPUT_WEBHOOK_URL,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify(payload)
          }
        );


      if (!response.ok) {

        throw new Error(
          `HTTP ${response.status}`
        );

      }


      const result =
        await response.json();


      if (result.success) {

        setMessage(
          result.message ||
          '매장 운영 데이터가 저장되었습니다.'
        );

        setMessageType('success');

        setFormData(initialForm);

      } else {

        setMessage(
          result.message ||
          '저장에 실패했습니다.'
        );

        setMessageType('error');

      }

    } catch (error) {

      console.error(error);

      setMessage(
        '데이터 저장 중 오류가 발생했습니다.'
      );

      setMessageType('error');

    } finally {

      setLoading(false);

    }

  }


  return (

    <main className="container">

      <section className="intro">

        <span className="intro-label">
          매장 운영 데이터
        </span>

        <h2>
          월간 실적을 입력해주세요
        </h2>

        <p>
          입력된 데이터는 매장별 실적 분석과
          월간 리포트 생성에 활용됩니다.
        </p>

      </section>


      <form
        className="form-card"
        onSubmit={handleSubmit}
      >

        {/* 기본 정보 */}

        <section className="form-section">

          <h3>
            기본 정보
          </h3>

          <div className="form-grid">

            <div className="field">

              <label>
                매장
              </label>

              <select
                name="store_id"
                value={
                  formData.store_id
                }
                onChange={
                  handleChange
                }
              >

                <option value="DG001">
                  대구은행점
                </option>

                <option value="DG002">
                  범물점
                </option>

                <option value="DG003">
                  시지점
                </option>

              </select>

            </div>


            <div className="field">

              <label>
                영업월
              </label>

              <input
                type="date"
                name="business_date"
                value={
                  formData.business_date
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>


            <div className="field">

              <label>
                상담 건수
              </label>

              <input
                type="number"
                min="0"
                name="consults"
                value={
                  formData.consults
                }
                onChange={
                  handleChange
                }
                placeholder="예: 210"
                required
              />

            </div>

          </div>

        </section>


        {/* 단말 */}

        <section className="form-section">

          <h3>
            단말기별 판매량
          </h3>

          <div className="form-grid four">

            <NumberInput
              label="Galaxy S26"
              name="galaxy_s26_sales"
              value={
                formData.galaxy_s26_sales
              }
              onChange={handleChange}
            />

            <NumberInput
              label="Galaxy S26 Ultra"
              name="galaxy_s26_ultra_sales"
              value={
                formData.galaxy_s26_ultra_sales
              }
              onChange={handleChange}
            />

            <NumberInput
              label="iPhone 18 Pro"
              name="iphone18_pro_sales"
              value={
                formData.iphone18_pro_sales
              }
              onChange={handleChange}
            />

            <NumberInput
              label="Flip8"
              name="flip8_sales"
              value={
                formData.flip8_sales
              }
              onChange={handleChange}
            />

          </div>

        </section>


        {/* 프로모션 */}

        <section className="form-section">

          <h3>
            프로모션
          </h3>

          <div className="form-grid two">

            <div className="field">

              <label>
                본사 지정 프로모션
              </label>

              <input
                type="text"
                name="promotion_hq"
                value={
                  formData.promotion_hq
                }
                onChange={
                  handleChange
                }
                placeholder="진행 중인 본사 프로모션"
              />

            </div>


            <div className="field">

              <label>
                지점별 프로모션
              </label>

              <input
                type="text"
                name="promotion_store"
                value={
                  formData.promotion_store
                }
                onChange={
                  handleChange
                }
                placeholder="지점 자체 프로모션"
              />

            </div>

          </div>

        </section>


        {/* 미구매 */}

        <section className="form-section">

          <h3>
            미구매 사유
          </h3>

          <div className="form-grid">

            <NumberInput
              label="가격"
              name="no_purchase_price"
              value={
                formData.no_purchase_price
              }
              onChange={handleChange}
            />

            <NumberInput
              label="혜택"
              name="no_purchase_benefit"
              value={
                formData.no_purchase_benefit
              }
              onChange={handleChange}
            />

            <NumberInput
              label="서비스"
              name="no_purchase_service"
              value={
                formData.no_purchase_service
              }
              onChange={handleChange}
            />

          </div>

        </section>


        {message && (

          <div
            className={
              `message ${messageType}`
            }
          >
            {message}
          </div>

        )}


        <button
          className="submit-button"
          type="submit"
          disabled={loading}
        >

          {loading
            ? '저장 중...'
            : '월간 실적 저장'
          }

        </button>

      </form>

    </main>

  );

}


// =====================================================
// DASHBOARD PAGE
// =====================================================

function DashboardPage() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');


  async function loadDashboard() {

    setLoading(true);

    setError('');


    try {

      const response =
        await fetch(
          DASHBOARD_URL
        );


      if (!response.ok) {

        throw new Error(
          `HTTP ${response.status}`
        );

      }


      const result =
        await response.json();


      setData(result);

    } catch (error) {

      console.error(error);

      setError(
        '관리자 데이터를 불러오지 못했습니다.'
      );

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    loadDashboard();

  }, []);


  if (loading) {

    return (

      <main className="container">

        <div className="loading-box">
          관리자 데이터를 불러오는 중...
        </div>

      </main>

    );

  }


  if (error) {

    return (

      <main className="container">

        <div className="message error">
          {error}
        </div>

      </main>

    );

  }


  const summary =
    data?.summary ?? {};

  const stores =
    data?.stores ?? [];

  function downloadLatestReport() {

    const month =
      data?.analysis_month;

    if (!month) {
      alert(
        '다운로드할 분석월이 없습니다.'
      );
      return;
    }

    const url =
      `https://hddoy2021.app.n8n.cloud/webhook/report-download?month=${month}`;

    window.location.href = url;
  }
  return (

    <main className="container">

      <div className="dashboard-header">

        <div>

          <span className="intro-label">
            관리자 요약
          </span>

          <h2>
            {data?.analysis_month}
            {' '}
            월간 매장 현황
          </h2>

          <p>
            매장별 최신 분석 결과를
            한눈에 확인할 수 있습니다.
          </p>

        </div>

        <div className="dashboard-actions">

          <button
            className="refresh-button"
            onClick={loadDashboard}
          >
            새로고침
          </button>

          <button
            className="download-button"
            onClick={downloadLatestReport}
          >
            월간 PDF 다운로드
          </button>

        </div>

      </div>


      {/* ==============================
          SUMMARY
      ============================== */}

      <section className="summary-grid">

        <SummaryCard
          label="전체 매장"
          value={
            summary.total_stores ?? 0
          }
        />

        <SummaryCard
          label="관리필요"
          value={
            summary.management_needed ?? 0
          }
          type="danger"
        />

        <SummaryCard
          label="우수사례"
          value={
            summary.best_practice ?? 0
          }
          type="best"
        />

        <SummaryCard
          label="상승"
          value={
            summary.up ?? 0
          }
          type="up"
        />

        <SummaryCard
          label="하락"
          value={
            summary.down ?? 0
          }
          type="down"
        />

      </section>


      {/* ==============================
          STORE LIST
      ============================== */}

      <section className="store-section">

        <div className="section-heading">

          <div>

            <h3>
              매장별 분석 결과
            </h3>

            <p>
              관리가 필요한 매장을
              우선적으로 확인하세요.
            </p>

          </div>

        </div>


        <div className="store-list">

          {stores.map(store => (

            <StoreCard
              key={
                store.store_id
              }
              store={
                store
              }
            />

          ))}

        </div>

      </section>

    </main>

  );

}


// =====================================================
// COMPONENTS
// =====================================================

function SummaryCard({
  label,
  value,
  type = ''
}) {

  return (

    <div
      className={
        `summary-card ${type}`
      }
    >

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

      <small>
        매장
      </small>

    </div>

  );

}


function StoreCard({
  store
}) {

  return (

    <article className="store-card">

      <div className="store-card-top">

        <div>

          <span className="store-id">
            {store.store_id}
          </span>

          <h3>
            {store.store_name}
          </h3>

          <p>
            {store.business_type}
          </p>

        </div>


        <StatusBadge
          status={
            store.store_status
          }
        />

      </div>


      <div className="store-metrics">

        <div>

          <span>
            판매량
          </span>

          <strong>
            {store.sales_count}
          </strong>

          <small>
            대
          </small>

        </div>


        <div>

          <span>
            상담 건수
          </span>

          <strong>
            {store.consults}
          </strong>

          <small>
            건
          </small>

        </div>

      </div>


      <div className="analysis-box">

        <span className="box-label">
          AI 주요 분석
        </span>

        <p>
          {store.status_reason ||
            '분석 내용이 없습니다.'}
        </p>

      </div>


      <div className="target-box">

        <span>
          추천 타깃 고객
        </span>

        <p>
          {
            store
              .recommended_target_customer ||
            '추천 정보가 없습니다.'
          }
        </p>

      </div>

    </article>

  );

}


function StatusBadge({
  status
}) {

  const className =
    `status-badge status-${status}`;


  return (

    <span className={className}>
      {status}
    </span>

  );

}


function NumberInput({
  label,
  name,
  value,
  onChange
}) {

  return (

    <div className="field">

      <label>
        {label}
      </label>

      <input
        type="number"
        min="0"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="0"
        required
      />

    </div>

  );

}


export default App;