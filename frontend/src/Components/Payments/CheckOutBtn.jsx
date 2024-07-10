const PaymentButton = () => {
  return (
    <div class="check-out-container" id="btnSubmit">
      <div class="check-out-left-side">
        <div class="check-out-card">
          <div class="check-out-card-line"></div>
          <div class="check-out-buttons"></div>
        </div>
        <div class="check-out-post">
          <div class="check-out-post-line"></div>
          <div class="check-out-screen">
            <div class="check-out-dollar">$</div>
          </div>
          <div class="check-out-numbers"></div>
          <div class="check-out-numbers-line2"></div>
        </div>
      </div>
      <div class="check-out-right-side">
        <div class="check-out-new">Checkout</div>
      </div>
    </div>
  );
};

export default PaymentButton;
